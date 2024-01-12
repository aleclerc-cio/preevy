import { baseSshClient, formatSshConnectionConfig, keyFingerprint, } from '@preevy/common';
export class UnverifiedHostKeyError extends Error {
    constructor(tunnelOpts, hostKeySignature) {
        super(`Host key verification failed for connection ${tunnelOpts.url}`);
        this.tunnelOpts = tunnelOpts;
        this.hostKeySignature = hostKeySignature;
        this.name = 'UnverifiedHostKeyError';
    }
}
const connect = ({ log, connectionConfig, }) => new Promise(resolve => {
    let hostKey;
    baseSshClient({
        log,
        connectionConfig,
        onHostKey: (key, verified) => {
            hostKey = key;
            if (!verified) {
                resolve({ unverifiedHostKey: key });
            }
        },
    }).then(client => { resolve({ client, hostKey }); }, err => resolve({ error: err }));
});
export const connectToTunnelServerSsh = async ({ log, tunnelOpts, connectionOpts, clientPrivateKey, username, knownServerPublicKeys, confirmHostFingerprint, }) => {
    const connectionConfigBase = {
        ...connectionOpts,
        clientPrivateKey,
        username,
        tlsServerName: tunnelOpts.tlsServerName,
        insecureSkipVerify: tunnelOpts.insecureSkipVerify,
    };
    const serverPublicKeysForThisConnection = [...knownServerPublicKeys];
    const attempt = async () => {
        const connectionConfig = { ...connectionConfigBase, knownServerPublicKeys: serverPublicKeysForThisConnection };
        log.debug('connecting to tunnel server ssh with config', formatSshConnectionConfig(connectionConfig));
        const result = await connect({ log, connectionConfig });
        if ('hostKey' in result) {
            return result;
        }
        if ('error' in result) {
            log.error('error checking connection', result.error);
            throw new Error(`Cannot connect to ${tunnelOpts.url}: ${result.error.message}`);
        }
        const confirmation = await confirmHostFingerprint({
            hostKeyFingerprint: keyFingerprint(result.unverifiedHostKey),
            hostname: connectionOpts.hostname,
            port: connectionOpts.port,
        });
        if (!confirmation) {
            return false;
        }
        serverPublicKeysForThisConnection.push(result.unverifiedHostKey);
        return await attempt();
    };
    return await attempt();
};
//# sourceMappingURL=tunnel-server-client.js.map