var _DriverCommand_driverName, _DriverCommand_driver;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Flags } from '@oclif/core';
import { isPartialMachine, profileStore } from '@preevy/core';
import { pickBy } from 'lodash-es';
import { flagsForAllDrivers, machineDrivers, removeDriverPrefix } from './drivers.js';
import ProfileCommand from './profile-command.js';
class DriverCommand extends ProfileCommand {
    constructor() {
        super(...arguments);
        _DriverCommand_driverName.set(this, void 0);
        _DriverCommand_driver.set(this, void 0);
    }
    async init() {
        await super.init();
        __classPrivateFieldSet(this, _DriverCommand_driverName, this.flags.driver ?? this.preevyConfig?.driver ?? this.profile.driver, "f");
    }
    get driverName() {
        if (!__classPrivateFieldGet(this, _DriverCommand_driverName, "f")) {
            throw new Error("Driver wasn't specified");
        }
        return __classPrivateFieldGet(this, _DriverCommand_driverName, "f");
    }
    async driverFlags(driver, type) {
        const driverFlagNames = Object.keys(machineDrivers[driver][type]);
        const flagDefaults = pickBy({
            ...await profileStore(this.store).ref.defaultDriverFlags(driver),
            ...this.preevyConfig?.drivers?.[driver] ?? {},
        }, (_v, k) => driverFlagNames.includes(k));
        return {
            ...flagDefaults,
            ...removeDriverPrefix(driver, this.flags),
        };
    }
    async driver() {
        if (__classPrivateFieldGet(this, _DriverCommand_driver, "f")) {
            return __classPrivateFieldGet(this, _DriverCommand_driver, "f");
        }
        const { profile, driverName } = this;
        __classPrivateFieldSet(this, _DriverCommand_driver, machineDrivers[driverName].factory({
            flags: await this.driverFlags(driverName, 'flags'),
            profile,
            store: this.store,
            log: this.logger,
            debug: this.flags.debug,
        }), "f");
        return __classPrivateFieldGet(this, _DriverCommand_driver, "f");
    }
    async withConnection(envId, f) {
        const connection = await this.connect(envId);
        try {
            return await f(connection);
        }
        finally {
            connection[Symbol.dispose]();
        }
    }
    async connect(envId) {
        const driver = await this.driver();
        const machine = await driver.getMachine({ envId });
        if (!machine || isPartialMachine(machine)) {
            throw new Error(`No machine found for envId ${envId}`);
        }
        // eslint false positive here on case-sensitive filesystems due to unknown type
        // eslint-disable-next-line @typescript-eslint/return-await
        return await driver.connect(machine, { log: this.logger, debug: this.flags.debug });
    }
}
_DriverCommand_driverName = new WeakMap(), _DriverCommand_driver = new WeakMap();
DriverCommand.baseFlags = {
    ...ProfileCommand.baseFlags,
    driver: Flags.custom({
        description: 'Machine driver to use',
        char: 'd',
        options: Object.keys(machineDrivers),
        required: false,
    })(),
    ...flagsForAllDrivers,
};
export default DriverCommand;
//# sourceMappingURL=driver-command.js.map