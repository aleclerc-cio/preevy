import { Args, ux } from '@oclif/core';
import { BaseCommand, text } from '@preevy/cli-common';
import { loadProfileConfig } from '../../profile-command.js';
// eslint-disable-next-line no-use-before-define
class UseProfile extends BaseCommand {
    async run() {
        const alias = this.args.name;
        const profileConfig = loadProfileConfig(this.config);
        await profileConfig.setCurrent(alias);
        ux.info(text.success(`Profile ${text.code(alias)} is now being used`));
        return undefined;
    }
}
UseProfile.description = 'Set current profile';
UseProfile.args = {
    name: Args.string({
        description: 'name of the profile to use',
        required: true,
    }),
};
export default UseProfile;
//# sourceMappingURL=use.js.map