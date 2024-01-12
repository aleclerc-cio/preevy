import { generateSshKeyPair } from '../ssh/keypair.js';
import { getExposedTcpServicePorts } from '../compose/client.js';
export const flattenTunnels = (tunnels) => tunnels
    .map(t => Object.entries(t.ports).map(([port, url]) => ({
    project: t.project,
    service: t.service,
    port: Number(port),
    url,
})))
    .flat(2);
export const createTunnelingKey = async () => Buffer.from((await generateSshKeyPair('ed25519')).privateKey);
export const getTunnelNamesToServicePorts = (userModel, tunnelNameForService) => Object.fromEntries(getExposedTcpServicePorts(userModel)
    .flatMap(servicePorts => tunnelNameForService(servicePorts).map(x => ({ name: servicePorts.name, ...x })))
    .map(({ tunnel, ...rest }) => [tunnel, rest]));
//# sourceMappingURL=model.js.map