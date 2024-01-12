import { Flags, ux } from '@oclif/core';
import { tableFlags } from '@preevy/cli-common';
import ProfileCommand from '../../profile-command.js';
// eslint-disable-next-line no-use-before-define
class ListProfile extends ProfileCommand {
    async run() {
        const { profiles, current } = await this.profileConfig.list();
        if (this.flags.json) {
            return { profiles, current };
        }
        ux.table(Object.values(profiles), {
            alias: {
                header: 'Alias',
                get: ({ alias }) => `${alias}${alias === current ? ' *' : ''}`,
            },
            id: {
                header: 'Id',
            },
            location: {
                header: 'Location',
            },
        }, this.flags);
        return undefined;
    }
}
ListProfile.description = 'Lists profiles';
ListProfile.enableJsonFlag = true;
ListProfile.flags = {
    ...tableFlags,
    json: Flags.boolean({}),
};
export default ListProfile;
//# sourceMappingURL=ls.js.map