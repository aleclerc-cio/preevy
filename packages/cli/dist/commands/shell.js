import { Args } from '@oclif/core';
import { commands } from '@preevy/core';
import DriverCommand from '../driver-command.js';
// eslint-disable-next-line no-use-before-define
class Shell extends DriverCommand {
    async run() {
        const { args, rawArgs } = this;
        const driver = await this.driver();
        const result = await commands.shell({
            envId: args.envId,
            args: rawArgs.slice(1),
            machineDriver: driver,
            log: this.logger,
        });
        if ('code' in result) {
            this.exit(result.code);
        }
        else {
            process.kill(process.pid, result.signal);
        }
        return undefined;
    }
}
Shell.description = 'Execute a command or start an interactive shell inside an environment';
Shell.aliases = ['ssh'];
Shell.hidden = true;
Shell.strict = false;
Shell.flags = {};
Shell.args = {
    envId: Args.string({ description: 'Environment id', required: true }),
};
Shell.enableJsonFlag = false;
export default Shell;
//# sourceMappingURL=shell.js.map