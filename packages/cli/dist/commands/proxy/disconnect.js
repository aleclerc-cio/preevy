import { Args } from '@oclif/core';
import { commands, execPromiseStdout } from '@preevy/core';
import { tableFlags } from '@preevy/cli-common';
import ProfileCommand from '../../profile-command.js';
// eslint-disable-next-line no-use-before-define
class Disconnect extends ProfileCommand {
    // eslint-disable-next-line class-methods-use-this
    async run() {
        const { args } = this;
        const inspector = commands.proxy.inspectRunningComposeApp(args['compose-project']);
        const agentContainer = await inspector.getPreevyAgentContainer();
        if (agentContainer) {
            await execPromiseStdout(`docker rm -f ${agentContainer.id}`);
            this.log(`Removed ${agentContainer.id}, disconnected ${args['compose-project']} tunnel`);
        }
        return undefined;
    }
}
Disconnect.description = 'Disconnect tunneled local compose application';
Disconnect.flags = {
    ...tableFlags,
};
Disconnect.strict = false;
Disconnect.hidden = true;
Disconnect.args = {
    'compose-project': Args.string({
        description: 'Compose Project name',
        required: true,
    }),
};
export default Disconnect;
//# sourceMappingURL=disconnect.js.map