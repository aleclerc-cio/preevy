import { ux } from '@oclif/core';
import ProfileCommand from '../../profile-command.js';
// eslint-disable-next-line no-use-before-define
class CurrentProfile extends ProfileCommand {
    async run() {
        const currentProfile = await this.profileConfig.current();
        if (!currentProfile) {
            return ux.info('No profile is loaded, use init command to create or import a new profile');
        }
        const { alias, id, location } = currentProfile;
        const result = { alias, id, location };
        return this.flags.json ? result : ux.styledObject(result);
    }
}
CurrentProfile.description = 'Display current profile in use';
CurrentProfile.strict = false;
CurrentProfile.enableJsonFlag = true;
export default CurrentProfile;
//# sourceMappingURL=current.js.map