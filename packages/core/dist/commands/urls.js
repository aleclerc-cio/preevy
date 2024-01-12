import { COMPOSE_TUNNEL_AGENT_SERVICE_NAME } from '@preevy/common';
import { generateBasicAuthCredentials, jwtGenerator } from '../credentials/index.js';
import { queryTunnels } from '../compose-tunnel-agent-client.js';
import { flattenTunnels } from '../tunneling/index.js';
const tunnelFilter = ({ serviceAndPort, showPreevyService }) => {
    if (serviceAndPort) {
        return ({ service, port }) => service === serviceAndPort.service
            && (!serviceAndPort.port || port === serviceAndPort.port);
    }
    if (!showPreevyService) {
        return ({ service }) => service !== COMPOSE_TUNNEL_AGENT_SERVICE_NAME;
    }
    return () => true;
};
export const urls = async ({ serviceAndPort, tunnelingKey, includeAccessCredentials, retryOpts, showPreevyService, composeTunnelServiceUrl, }) => {
    const credentials = await generateBasicAuthCredentials(jwtGenerator(tunnelingKey));
    const tunnels = await queryTunnels({
        composeTunnelServiceUrl,
        retryOpts,
        credentials,
        includeAccessCredentials,
    });
    return flattenTunnels(tunnels).filter(tunnelFilter({ serviceAndPort, showPreevyService }));
};
//# sourceMappingURL=urls.js.map