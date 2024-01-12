import { ux } from '@oclif/core';
import { asyncMap, asyncToArray } from 'iter-tools-es';
import { commands } from '@preevy/core';
import { tableFlags } from '@preevy/cli-common';
import DriverCommand from '../driver-command.js';
// eslint-disable-next-line no-use-before-define
class Ls extends DriverCommand {
    async run() {
        const { flags } = this;
        const driver = await this.driver();
        const machines = await asyncToArray(asyncMap(x => ({ ...x, state: ('error' in x) ? x.error : 'OK' }), await commands.ls({ machineDriver: driver, log: this.logger })));
        if (flags.json) {
            return machines;
        }
        ux.table(machines, {
            envId: { header: 'Env' },
            providerId: { header: 'Driver ID' },
            locationDescription: { header: 'Location' },
            version: { header: 'Version', extended: true },
            state: { header: 'State' },
        }, this.flags);
        return undefined;
    }
}
Ls.description = 'List preview environments';
Ls.flags = {
    ...tableFlags,
};
Ls.args = {};
Ls.enableJsonFlag = true;
export default Ls;
//# sourceMappingURL=ls.js.map