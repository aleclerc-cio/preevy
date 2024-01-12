import path from 'path';
import retry from 'p-retry';
import util from 'util';
import { createRequire } from 'module';
import { mapValues, merge } from 'lodash-es';
import { COMPOSE_TUNNEL_AGENT_PORT, COMPOSE_TUNNEL_AGENT_SERVICE_LABELS, COMPOSE_TUNNEL_AGENT_SERVICE_NAME, dateReplacer } from '@preevy/common';
import { composeModelFilename } from './compose/model.js';
import { withBasicAuthCredentials } from './credentials/index.js';
import { driverMetadataFilename } from './env-metadata.js';
import { REMOTE_DIR_BASE } from './remote-files.js';
import { isPacked, pkgSnapshotDir } from './pkg.js';
import { addScriptInjectionsToServices } from './compose/script-injection.js';
const require = createRequire(import.meta.url);
const COMPOSE_TUNNEL_AGENT_DIR = path.join(path.dirname(require.resolve('@preevy/compose-tunnel-agent')), '..');
const baseDockerProxyService = () => {
    const contextDir = isPacked() ? pkgSnapshotDir(path.join(import.meta.url, '../../compose-tunnel-agent')) : COMPOSE_TUNNEL_AGENT_DIR;
    return {
        build: {
            context: contextDir,
            dockerfile: path.join(contextDir, 'Dockerfile'),
        },
        ports: [
            {
                mode: 'ingress',
                target: COMPOSE_TUNNEL_AGENT_PORT,
                published: '0',
                protocol: 'tcp',
            },
        ],
        labels: {
            [COMPOSE_TUNNEL_AGENT_SERVICE_LABELS.ACCESS]: 'private',
        },
    };
};
export const addBaseComposeTunnelAgentService = (model) => ({
    ...model,
    services: {
        ...model.services,
        [COMPOSE_TUNNEL_AGENT_SERVICE_NAME]: baseDockerProxyService(),
    },
});
const metadataDirectory = '/preevy/metadata';
export const addComposeTunnelAgentService = ({ tunnelOpts, sshPrivateKeyPath, knownServerPublicKeyPath, debug, user, envId, machineStatusCommand, envMetadata, composeModelPath, composeProject, profileThumbprint, privateMode, defaultAccess, scriptInjections, }, model) => ({
    ...model,
    services: {
        ...scriptInjections ? addScriptInjectionsToServices(model.services, scriptInjections) : model.services,
        [COMPOSE_TUNNEL_AGENT_SERVICE_NAME]: merge(baseDockerProxyService(), {
            restart: 'always',
            networks: Object.keys(model.networks || {}),
            volumes: [
                {
                    type: 'bind',
                    source: '/var/run/docker.sock',
                    target: '/var/run/docker.sock',
                },
                {
                    type: 'bind',
                    source: sshPrivateKeyPath,
                    target: '/preevy/.ssh/id_rsa',
                    read_only: true,
                    bind: { create_host_path: true },
                },
                {
                    type: 'bind',
                    source: knownServerPublicKeyPath,
                    target: '/preevy/known_server_keys/tunnel_server',
                    read_only: true,
                    bind: { create_host_path: true },
                },
                {
                    type: 'bind',
                    source: `${REMOTE_DIR_BASE}/${driverMetadataFilename}`,
                    target: `${metadataDirectory}/${driverMetadataFilename}`,
                    read_only: true,
                    bind: { create_host_path: true },
                },
                {
                    type: 'bind',
                    source: composeModelPath,
                    target: `/preevy/${composeModelFilename}`,
                    read_only: true,
                    bind: { create_host_path: true },
                },
            ],
            user,
            labels: {
                [COMPOSE_TUNNEL_AGENT_SERVICE_LABELS.ENV_ID]: envId,
                ...profileThumbprint ? { [COMPOSE_TUNNEL_AGENT_SERVICE_LABELS.PROFILE_THUMBPRINT]: profileThumbprint } : {},
                [COMPOSE_TUNNEL_AGENT_SERVICE_LABELS.PRIVATE_MODE]: privateMode.toString(),
            },
            environment: {
                SSH_URL: tunnelOpts.url,
                TLS_SERVERNAME: tunnelOpts.tlsServerName,
                PREEVY_ENV_ID: envId,
                PORT: COMPOSE_TUNNEL_AGENT_PORT.toString(),
                ...machineStatusCommand ? { MACHINE_STATUS_COMMAND: JSON.stringify(machineStatusCommand) } : {},
                ENV_METADATA: JSON.stringify(envMetadata, dateReplacer),
                ENV_METADATA_FILES: `${metadataDirectory}/${driverMetadataFilename}`,
                ...debug ? { DEBUG: '1' } : {},
                HOME: '/preevy',
                COMPOSE_PROJECT: composeProject,
                DEFAULT_ACCESS_LEVEL: defaultAccess,
            },
        }),
    },
});
export const findComposeTunnelAgentUrl = (serviceUrls) => {
    const serviceUrl = serviceUrls.find(({ name, port }) => name === COMPOSE_TUNNEL_AGENT_SERVICE_NAME && port === COMPOSE_TUNNEL_AGENT_PORT)?.url;
    if (!serviceUrl) {
        throw new Error(`Cannot find compose tunnel agent API service URL ${COMPOSE_TUNNEL_AGENT_SERVICE_NAME}:${COMPOSE_TUNNEL_AGENT_PORT} in: ${util.inspect(serviceUrls)}`);
    }
    return serviceUrl;
};
export const queryTunnels = async ({ retryOpts = { retries: 0 }, composeTunnelServiceUrl, credentials, includeAccessCredentials, }) => {
    const { tunnels } = await retry(async () => {
        const r = await fetch(`${composeTunnelServiceUrl}/tunnels`, { signal: AbortSignal.timeout(2500), headers: { Authorization: `Bearer ${credentials.password}` } });
        if (!r.ok) {
            throw new Error(`Failed to connect to docker proxy at ${composeTunnelServiceUrl}: ${r.status}: ${r.statusText}`);
        }
        return await r.json();
    }, retryOpts);
    return tunnels
        .map(tunnel => ({
        ...tunnel,
        ports: mapValues(tunnel.ports, includeAccessCredentials
            ? withBasicAuthCredentials(credentials, includeAccessCredentials)
            : x => x),
    }));
};
//# sourceMappingURL=compose-tunnel-agent-client.js.map