import { Args, Flags, ux } from '@oclif/core';
import { fsTypeFromUrl, nextAvailableAlias } from '@preevy/core';
import { BaseCommand, text } from '@preevy/cli-common';
import { EOL } from 'os';
import { loadProfileConfig, onProfileChange } from '../../profile-command.js';
// eslint-disable-next-line no-use-before-define
class ImportProfile extends BaseCommand {
    async run() {
        const profileConfig = loadProfileConfig(this.config);
        let alias = this.flags.name;
        if (alias) {
            if (await profileConfig.has(alias)) {
                ux.error([
                    `A profile with the alias ${text.code(alias)} already exists.`,
                    `Run ${text.command(this.config, 'profile ls')} to list existing profiles.`,
                    `Run ${text.command(this.config, 'profile rm <profile-alias>')} to remove an existing profile.`,
                ].join(EOL));
            }
        }
        else {
            alias = nextAvailableAlias(Object.keys((await profileConfig.list()).profiles));
        }
        const { info } = await profileConfig.importExisting(alias, this.args.location, this.flags.use);
        onProfileChange(info, fsTypeFromUrl(this.args.location));
        ux.info(text.success(`Profile ${text.code(info.id)} imported successfully as ${text.code(alias)} 👍`));
    }
}
ImportProfile.description = 'Import an existing profile';
ImportProfile.flags = {
    name: Flags.string({
        description: 'Name of the profile',
        required: false,
    }),
    use: Flags.boolean({
        description: 'Mark the new profile as the current profile',
        required: false,
    }),
};
ImportProfile.args = {
    location: Args.string({
        description: 'URL of the profile',
        required: true,
    }),
};
export default ImportProfile;
//# sourceMappingURL=import.js.map