import { profileStore } from '@preevy/core';
import { Flags, ux } from '@oclif/core';
import { mapValues, omit, pickBy } from 'lodash-es';
import { text } from '@preevy/cli-common';
import { removeDriverFlagPrefix, extractDriverFlags, flagsForAllDrivers, machineCreationflagsForAllDrivers, driverFlags, machineCreationDriverFlags, } from '../../../drivers.js';
import ProfileCommand from '../../../profile-command.js';
import DriverCommand from '../../../driver-command.js';
const removeDefaultValues = (flags) => mapValues(flags, v => omit(v, 'default'));
const allDriverFlags = Object.freeze({
    ...flagsForAllDrivers,
    ...machineCreationflagsForAllDrivers,
});
const removeRequiredFlags = (flags) => pickBy(flags, v => !v.required);
const allNonRequiredDriverFlags = new Set(Object.keys(removeRequiredFlags(allDriverFlags)));
const validateUnset = (driver, unset) => {
    const flagsForDriver = { ...driverFlags(driver), ...machineCreationDriverFlags(driver) };
    const driverFlagsAvailableToUnset = new Set(Object.keys(removeRequiredFlags(flagsForDriver)));
    const unknownUnset = unset.filter(k => !driverFlagsAvailableToUnset.has(k));
    if (unknownUnset.length) {
        ux.error(`Unknown unset values for driver ${text.code(driver)}: ${text.codeList(unknownUnset)}. Available options to unset: ${text.codeList([...driverFlagsAvailableToUnset.keys()])}`);
    }
};
// eslint-disable-next-line no-use-before-define
class UpdateProfileConfig extends ProfileCommand {
    async run() {
        const profileDriver = this.profile.driver;
        const driver = (this.flags.driver || profileDriver);
        if (!driver) {
            ux.error('Missing driver configuration in profile, use the --driver flag to set the desired machine driver');
        }
        const { unset } = this.flags;
        validateUnset(driver, unset);
        const updatedResult = await profileStore(this.store).transaction(async (op) => {
            if (driver !== profileDriver) {
                await op.driver().write(driver);
            }
            const driverFlagsTx = op.defaultDriverFlags(driver);
            const source = await driverFlagsTx.read();
            const updated = {
                ...omit(source, ...unset.map((k) => removeDriverFlagPrefix(driver, k))),
                ...extractDriverFlags(this.flags, driver, { excludeDefaultValues: false }),
            };
            await driverFlagsTx.write(updated);
            return updated;
        });
        ux.info(`Updated configuration for driver ${text.code(driver)}:`);
        if (Object.keys(updatedResult).length) {
            ux.styledObject(updatedResult);
        }
        else {
            ux.info('(empty)');
        }
    }
}
UpdateProfileConfig.description = 'View and update profile configuration';
UpdateProfileConfig.flags = {
    ...removeDefaultValues(allDriverFlags),
    driver: DriverCommand.baseFlags.driver,
    unset: Flags.string({
        options: [...allNonRequiredDriverFlags],
        description: 'Unset a configuration option',
        default: [],
        multiple: true,
        delimiter: ',',
        multipleNonGreedy: true,
    }),
};
UpdateProfileConfig.strict = false;
UpdateProfileConfig.enableJsonFlag = true;
export default UpdateProfileConfig;
//# sourceMappingURL=update.js.map