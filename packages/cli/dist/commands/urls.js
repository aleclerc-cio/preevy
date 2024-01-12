import fs from 'fs';
import yaml from 'yaml';
import { Args, ux } from '@oclif/core';
import { addBaseComposeTunnelAgentService, commands, findComposeTunnelAgentUrl, findEnvId, getTunnelNamesToServicePorts, profileStore } from '@preevy/core';
import { tableFlags, text, tunnelServerFlags } from '@preevy/cli-common';
import { asyncReduce } from 'iter-tools-es';
import { tunnelNameResolver } from '@preevy/common';
import { connectToTunnelServerSsh } from '../tunnel-server-client.js';
import ProfileCommand from '../profile-command.js';
import { envIdFlags, urlFlags } from '../common-flags.js';
export const writeUrlsToFile = async ({ log }, { 'output-urls-to': outputUrlsTo }, urls) => {
    if (!outputUrlsTo)
        return;
    const contents = /\.ya?ml$/.test(outputUrlsTo) ? yaml.stringify(urls) : JSON.stringify(urls);
    log.info(`Writing URLs to file ${text.code(outputUrlsTo)}`);
    await fs.promises.writeFile(outputUrlsTo, contents, { encoding: 'utf8' });
};
export const printUrls = (flatTunnels, flags) => {
    ux.table(flatTunnels, {
        service: { header: 'Service' },
        port: { header: 'Port' },
        url: { header: 'URL' },
    }, {
        ...flags,
        'no-truncate': flags['no-truncate'] ?? (!flags.output && !flags.csv && flags['include-access-credentials']),
        'no-header': flags['no-header'] ?? (!flags.output && !flags.csv && flags['include-access-credentials']),
    });
};
export const filterUrls = ({ flatTunnels, context, filters }) => asyncReduce(flatTunnels, (urls, f) => f(context, urls), filters);
// eslint-disable-next-line no-use-before-define
class Urls extends ProfileCommand {
    async getComposeTunnelAgentUrl(envId, tunnelOpts, tunnelingKey) {
        const { client: tunnelServerSshClient } = await connectToTunnelServerSsh({
            tunnelOpts,
            profileStore: profileStore(this.store),
            tunnelingKey,
            log: this.logger,
        });
        const expectedTunnels = getTunnelNamesToServicePorts(addBaseComposeTunnelAgentService({ name: '' }), tunnelNameResolver({ envId }));
        const expectedTunnelUrls = await tunnelServerSshClient.execTunnelUrl(Object.keys(expectedTunnels));
        void tunnelServerSshClient.end();
        const expectedServiceUrls = Object.entries(expectedTunnels)
            .map(([tunnel, { name, port }]) => ({ name, port, url: expectedTunnelUrls[tunnel] }));
        return findComposeTunnelAgentUrl(expectedServiceUrls);
    }
    async run() {
        const log = this.logger;
        const { flags, args } = this;
        const envId = await findEnvId({
            userSpecifiedEnvId: flags.id,
            userSpecifiedProjectName: flags.project,
            userModel: () => this.ensureUserModel(),
            log,
        });
        const tunnelOpts = {
            url: flags['tunnel-url'],
            tlsServerName: flags['tls-hostname'],
            insecureSkipVerify: flags['insecure-skip-verify'],
        };
        const pStore = profileStore(this.store).ref;
        const tunnelingKey = await pStore.tunnelingKey();
        const composeTunnelServiceUrl = await this.getComposeTunnelAgentUrl(envId, tunnelOpts, tunnelingKey);
        const flatTunnels = await commands.urls({
            composeTunnelServiceUrl,
            serviceAndPort: args.service ? { service: args.service, port: args.port } : undefined,
            tunnelingKey,
            includeAccessCredentials: flags['include-access-credentials'] && flags['access-credentials-type'],
            showPreevyService: flags['show-preevy-service-urls'],
            retryOpts: { retries: 2 },
        });
        const urls = await filterUrls({
            flatTunnels,
            context: {
                log: this.logger,
                userModel: { name: '' }, // TODO: don't want to require a compose file for this command
            },
            filters: this.config.preevyHooks.filterUrls,
        });
        await writeUrlsToFile({ log: this.logger }, flags, urls);
        if (flags.json) {
            return urls;
        }
        printUrls(urls, flags);
        return undefined;
    }
}
Urls.description = 'Show urls for an existing environment';
Urls.flags = {
    ...envIdFlags,
    ...tunnelServerFlags,
    ...tableFlags,
    ...urlFlags,
};
Urls.enableJsonFlag = true;
Urls.args = {
    service: Args.string({
        description: 'Service name. If not specified, will show all services',
        required: false,
    }),
    port: Args.integer({
        description: 'Service port. If not specified, will show all ports for the specified service',
        required: false,
    }),
};
export default Urls;
//# sourceMappingURL=urls.js.map