import { Args } from '@oclif/core';
import { tunnelServerFlags, urlFlags, formatFlagsToArgs, tableFlags } from '@preevy/cli-common';
import { commands } from '@preevy/core';
import { pick } from 'lodash-es';
import PreevyUrlsCmd from '../urls.js';
import ProfileCommand from '../../profile-command.js';
// eslint-disable-next-line no-use-before-define
class Urls extends ProfileCommand {
    // eslint-disable-next-line class-methods-use-this
    async run() {
        const { args, flags } = this;
        const composeInspector = commands.proxy.inspectRunningComposeApp(args['compose-project']);
        const envId = await composeInspector.getEnvId();
        if (!envId) {
            throw new Error(`Proxy not running, use ${this.config.bin} proxy connect <compose-project>`);
        }
        const commandArgs = [`--id=${envId}`, ...formatFlagsToArgs(flags, PreevyUrlsCmd.flags), ...Object.values(pick(this.args, Object.keys(PreevyUrlsCmd.args))).map(x => `${x}`)];
        await this.config.runCommand('urls', commandArgs);
        return undefined;
    }
}
Urls.description = 'Show urls for tunneled local compose application';
Urls.flags = {
    ...tunnelServerFlags,
    ...urlFlags,
    ...tableFlags,
};
Urls.strict = false;
Urls.hidden = true;
Urls.args = {
    'compose-project': Args.string({
        description: 'Compose Project name',
        required: true,
    }),
    ...PreevyUrlsCmd.args,
};
Urls.enableJsonFlag = true;
export default Urls;
//# sourceMappingURL=urls.js.map