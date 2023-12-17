import { promisify } from 'util'
import path from 'path'
import pino from 'pino'
import fs from 'fs'
import { createPublicKey } from 'crypto'
import { createApp } from './src/app/index.js'
import { activeTunnelStoreKey, inMemoryActiveTunnelStore } from './src/tunnel-store/index.js'
import { getSSHKeys } from './src/ssh-keys.js'
import { proxy } from './src/proxy/index.js'
import { appLoggerFromEnv } from './src/logging.js'
import { tunnelsGauge, runMetricsServer, sshConnectionsGauge } from './src/metrics.js'
import { numberFromEnv, requiredEnv } from './src/env.js'
import { editUrl } from './src/url.js'
import { cookieSessionStore } from './src/session.js'
import { claimsSchema } from './src/auth.js'
import { createSshServer } from './src/ssh/index.js'

const log = pino.default(appLoggerFromEnv())

const { sshPrivateKey } = await getSSHKeys({
  defaultKeyLocation: './ssh/ssh_host_key',
  log,
})

const PORT = numberFromEnv('PORT') || 3000
const SSH_PORT = numberFromEnv('SSH_PORT') || 2222
const LISTEN_HOST = '0.0.0.0'
const BASE_URL = (() => {
  const result = new URL(requiredEnv('BASE_URL'))
  if (result.pathname !== '/' || result.search || result.username || result.password || result.hash) {
    throw new Error(`Invalid URL: ${result} - cannot specify path, search, username, password, or hash`)
  }
  return result
})()

const SAAS_PUBLIC_KEY = process.env.SAAS_PUBLIC_KEY || fs.readFileSync(
  path.join('/', 'etc', 'certs', 'preview-proxy', 'saas.key.pub'),
  { encoding: 'utf8' },
)

const saasPublicKey = createPublicKey(SAAS_PUBLIC_KEY)
const SAAS_JWT_ISSUER = process.env.SAAS_JWT_ISSUER ?? 'app.livecycle.run'

const activeTunnelStore = inMemoryActiveTunnelStore({ log })
const sessionStore = cookieSessionStore({ domain: BASE_URL.hostname, schema: claimsSchema, keys: process.env.COOKIE_SECRETS?.split(' ') })
const loginUrl = new URL('/login', editUrl(BASE_URL, { hostname: `auth.${BASE_URL.hostname}` })).toString()
const app = await createApp({
  sessionStore,
  activeTunnelStore,
  baseUrl: BASE_URL,
  saasBaseUrl: new URL(requiredEnv('SAAS_BASE_URL')),
  proxy: proxy({
    activeTunnelStore,
    log,
    loginUrl: new URL(loginUrl),
    sessionStore,
    saasPublicKey,
    jwtSaasIssuer: SAAS_JWT_ISSUER,
    baseHostname: BASE_URL.hostname,
  }),
  log,
  loginUrl: new URL(loginUrl),
  jwtSaasIssuer: SAAS_JWT_ISSUER,
  saasPublicKey,
})

const tunnelUrl = (
  rootUrl: URL,
  clientId: string,
  tunnel: string,
) => editUrl(rootUrl, { hostname: `${activeTunnelStoreKey(clientId, tunnel)}.${rootUrl.hostname}` }).toString()

const sshServer = createSshServer({
  log: log.child({ name: 'ssh_server' }),
  sshPrivateKey,
  socketDir: '/tmp', // TODO
  activeTunnelStore,
  helloBaseResponse: {
    // TODO: backwards compat, remove when we drop support for CLI v0.0.35
    baseUrl: { hostname: BASE_URL.hostname, port: BASE_URL.port, protocol: BASE_URL.protocol },
    rootUrl: BASE_URL.toString(),
  },
  tunnelsGauge,
  sshConnectionsGauge,
  tunnelUrl: (clientId, remotePath) => tunnelUrl(BASE_URL, clientId, remotePath),
})
  .listen(SSH_PORT, LISTEN_HOST, () => {
    app.log.debug('ssh server listening on port %j', SSH_PORT)
  })

app.listen({ host: LISTEN_HOST, port: PORT }).catch(err => {
  app.log.error(err)
  process.exit(1)
})

runMetricsServer(8888).catch(err => {
  app.log.error(err)
});

['SIGTERM', 'SIGINT'].forEach(signal => {
  process.once(signal, () => {
    app.log.info(`shutting down on ${signal}`)
    Promise.all([promisify(sshServer.close).call(sshServer), app.close()])
      .catch(err => {
        app.log.error(err)
        process.exit(1)
      })
      .finally(() => {
        process.exit(0)
      })
  })
})
