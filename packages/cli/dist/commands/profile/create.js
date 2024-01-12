import { Args, Flags, ux } from '@oclif/core';
import { createTunnelingKey } from '@preevy/core';
import { text } from '@preevy/cli-common';
import { extractDriverFlags, flagsForAllDrivers, machineCreationflagsForAllDrivers, } from '../../drivers.js';
import ProfileCommand from '../../profile-command.js';
import DriverCommand from '../../driver-command.js';
// eslint-disable-next-line no-use-before-define
class CreateProfile extends ProfileCommand {
    async run() {
        const alias = this.args.name;
        const driver = this.flags.driver;
        await this.profileConfig.create(alias, this.args.url, { driver }, async (op) => {
            if (driver) {
                await op.defaultDriverFlags(driver).write(extractDriverFlags(this.flags, driver));
            }
            this.log('Creating new SSH key pair');
            await op.tunnelingKey().write(await createTunnelingKey());
        }, this.flags.use);
        ux.info(text.success('Profile initialized 👍'));
        return undefined;
    }
}
CreateProfile.description = 'Create a new profile';
CreateProfile.flags = {
    ...flagsForAllDrivers,
    ...machineCreationflagsForAllDrivers,
    driver: DriverCommand.baseFlags.driver,
    use: Flags.boolean({
        description: 'Mark the new profile as the current profile',
        required: false,
    }),
};
CreateProfile.args = {
    name: Args.string({
        description: 'Name of the new profile',
        required: true,
    }),
    url: Args.string({
        description: 'URL of the new profile',
        required: true,
    }),
};
CreateProfile.strict = false;
CreateProfile.enableJsonFlag = true;
export default CreateProfile;
//# sourceMappingURL=create.js.map