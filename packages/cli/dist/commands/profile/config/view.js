import { profileStore } from '@preevy/core';
import { ux } from '@oclif/core';
import { EOL } from 'os';
import { text } from '@preevy/cli-common';
import ProfileCommand from '../../../profile-command.js';
// eslint-disable-next-line no-use-before-define
class ViewProfileConfig extends ProfileCommand {
    async run() {
        const pStore = profileStore(this.store).ref;
        const driver = this.profile.driver;
        const config = await pStore.defaultDriverFlags(driver);
        if (!driver) {
            ux.error([
                'Missing driver configuration in profile.',
                `Run ${text.command(this.config, 'profile config update --driver <driver>')} to set the desired machine driver`,
            ].join(EOL));
        }
        if (this.flags.json) {
            return { driver, defaultFlags: config };
        }
        ux.info(`Current configuration for driver ${text.code(driver)}:`);
        if (Object.keys(config).length) {
            ux.styledObject(config);
        }
        else {
            ux.info('(empty)');
        }
        return undefined;
    }
}
ViewProfileConfig.description = 'View profile configuration';
ViewProfileConfig.enableJsonFlag = true;
export default ViewProfileConfig;
//# sourceMappingURL=view.js.map