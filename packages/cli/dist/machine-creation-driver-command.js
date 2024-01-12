var _MachineCreationDriverCommand_machineCreationDriver;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { BaseCommand } from '@preevy/cli-common';
import DriverCommand from './driver-command.js';
import { machineCreationflagsForAllDrivers, machineDrivers } from './drivers.js';
class MachineCreationDriverCommand extends DriverCommand {
    constructor() {
        super(...arguments);
        _MachineCreationDriverCommand_machineCreationDriver.set(this, void 0);
    }
    async machineCreationDriver() {
        if (__classPrivateFieldGet(this, _MachineCreationDriverCommand_machineCreationDriver, "f")) {
            return __classPrivateFieldGet(this, _MachineCreationDriverCommand_machineCreationDriver, "f");
        }
        const { profile, driverName } = this;
        __classPrivateFieldSet(this, _MachineCreationDriverCommand_machineCreationDriver, machineDrivers[driverName].machineCreationFactory({
            flags: await this.driverFlags(driverName, 'machineCreationFlags'),
            profile,
            store: this.store,
            log: this.logger,
            debug: this.flags.debug,
        }), "f");
        return __classPrivateFieldGet(this, _MachineCreationDriverCommand_machineCreationDriver, "f");
    }
}
_MachineCreationDriverCommand_machineCreationDriver = new WeakMap();
MachineCreationDriverCommand.baseFlags = {
    ...BaseCommand.baseFlags,
    ...DriverCommand.baseFlags,
    ...machineCreationflagsForAllDrivers,
};
export default MachineCreationDriverCommand;
//# sourceMappingURL=machine-creation-driver-command.js.map