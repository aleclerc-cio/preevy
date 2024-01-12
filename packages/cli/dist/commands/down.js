import { Flags } from '@oclif/core';
import { findEnvId, machineResourceType, withSpinner } from '@preevy/core';
import DriverCommand from '../driver-command.js';
import { envIdFlags } from '../common-flags.js';
// eslint-disable-next-line no-use-before-define
class Down extends DriverCommand {
    async run() {
        const log = this.logger;
        const { flags } = this;
        const driver = await this.driver();
        const envId = await findEnvId({
            log,
            userSpecifiedEnvId: flags.id,
            userSpecifiedProjectName: flags.project,
            userModel: () => this.ensureUserModel(),
        });
        const machine = await driver.getMachine({ envId });
        if (!machine) {
            if (!flags.force) {
                throw new Error(`No machine found for environment ${envId}`);
            }
            return undefined;
        }
        await withSpinner(async () => {
            await driver.deleteResources(flags.wait, { type: machineResourceType, providerId: machine.providerId });
        }, { opPrefix: `Deleting ${driver.friendlyName} machine ${machine.providerId} for environment ${envId}` });
        await Promise.all(this.config.preevyHooks.envDeleted.map(envDeleted => envDeleted({ log: this.logger, userModel: { name: '' } }, { envId })));
        if (flags.json) {
            return envId;
        }
        this.log(envId);
        return undefined;
    }
}
Down.description = 'Delete preview environments';
Down.flags = {
    ...envIdFlags,
    force: Flags.boolean({
        description: 'Do not error if the environment is not found',
        default: false,
    }),
    wait: Flags.boolean({
        description: 'Wait for resource deletion to complete. If false (the default), the deletion will be started but not waited for',
        default: false,
    }),
};
Down.args = {};
Down.enableJsonFlag = true;
export default Down;
//# sourceMappingURL=down.js.map