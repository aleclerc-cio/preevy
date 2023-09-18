import { FastifyPluginAsync } from 'fastify'
import { Logger } from 'pino'
import z from 'zod'
import { KeyObject } from 'crypto'
import { ActiveTunnelStore } from '../tunnel-store/index.js'
import { NotFoundError } from '../http-server-helpers.js'
import { SessionStore } from '../session.js'
import { Claims, cliIdentityProvider, saasIdentityProvider, jwtAuthenticator } from '../auth.js'
import { editUrl } from '../url.js'
import { calcSaasLoginUrl } from './urls.js'

const loginQueryString = z.object({
  env: z.string(),
  returnPath: z.string().startsWith('/', 'must be an absolute path').optional(),
})

export const login: FastifyPluginAsync<{
  log: Logger
  activeTunnelStore: Pick<ActiveTunnelStore, 'get'>
  sessionStore: SessionStore<Claims>
  saasPublicKey: KeyObject
  jwtSaasIssuer: string
  baseUrl: URL
  saasBaseUrl: URL
  loginUrl: URL
}> = async (
  app,
  { activeTunnelStore, sessionStore, saasPublicKey, jwtSaasIssuer, saasBaseUrl, loginUrl, baseUrl },
) => {
  const saasLoginUrl = calcSaasLoginUrl({ loginUrl, saasBaseUrl })
  const saasIdp = saasIdentityProvider(jwtSaasIssuer, saasPublicKey)
  app.get<{
    Querystring: z.infer<typeof loginQueryString>
  }>('/login', {
    schema: {
      querystring: loginQueryString,
    },
  }, async (req, res) => {
    const { query: { env: envId, returnPath } } = req
    const activeTunnelEntry = await activeTunnelStore.get(envId)
    if (!activeTunnelEntry) {
      throw new NotFoundError(`Unknown envId: ${envId}`)
    }
    const { value: activeTunnel } = activeTunnelEntry
    console.log('login', activeTunnel)
    const session = sessionStore(req.raw, res.raw, activeTunnel.publicKeyThumbprint)
    console.log('session', session)
    if (!session.user) {
      const auth = jwtAuthenticator(
        activeTunnel.publicKeyThumbprint,
        [saasIdp, cliIdentityProvider(activeTunnel.publicKey, activeTunnel.publicKeyThumbprint)],
      )
      const result = await auth(req.raw)
      if (!result.isAuthenticated) {
        return await res
          .header('Access-Control-Allow-Origin', saasBaseUrl)
          .redirect(saasLoginUrl({ env: envId, returnPath }))
      }
      session.set(result.claims)
      session.save()
    }
    const redirectTo = editUrl(baseUrl, {
      hostname: `${envId}.${baseUrl.hostname}`,
      path: returnPath ?? '/',
    })
    return await res.redirect(redirectTo.toString())
  })
}
