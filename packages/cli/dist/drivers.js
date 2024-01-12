import { map, mapKeys, pickBy } from 'lodash-es';
import lightsail from '@preevy/driver-lightsail';
import gce from '@preevy/driver-gce';
import azure from '@preevy/driver-azure';
import kubePod from '@preevy/driver-kube-pod';
import { formatFlagsToArgs } from '@preevy/cli-common';
export const machineDrivers = {
    lightsail,
    gce,
    azure,
    'kube-pod': kubePod,
};
const toOuterFlag = (driverName, flags) => Object.assign({}, ...map(machineDrivers[driverName][flags], (flag, flagName) => ({
    [`${driverName}-${flagName}`]: {
        ...flag,
        helpGroup: `${driverName} driver`,
        required: false,
    },
})));
export const driverFlags = (driverName) => toOuterFlag(driverName, 'flags');
export const machineCreationDriverFlags = (driverName) => toOuterFlag(driverName, 'machineCreationFlags');
export const flagsForAllDrivers = {
    ...driverFlags('lightsail'),
    ...driverFlags('gce'),
    ...driverFlags('azure'),
    ...driverFlags('kube-pod'),
};
export const machineCreationflagsForAllDrivers = {
    ...machineCreationDriverFlags('lightsail'),
    ...machineCreationDriverFlags('gce'),
    ...machineCreationDriverFlags('azure'),
    ...machineCreationDriverFlags('kube-pod'),
};
export const removeDriverFlagPrefix = (driverName, flag) => {
    const driverPrefix = `${driverName}-`;
    return flag.indexOf(driverPrefix) === 0 ? flag.substring(driverPrefix.length) : flag;
};
export const removeDriverPrefix = (driverName, flags) => mapKeys(flags, (_, key) => removeDriverFlagPrefix(driverName, key));
export const addDriverPrefix = (driverName, flags) => mapKeys(flags, (_, key) => `${driverName}-${key}`);
const excludeDefaultFlags = (driverFlagDefs, driverFlagValues) => pickBy(driverFlagValues, (value, key) => value !== (driverFlagDefs[key])?.default);
export const formatDriverFlagsToArgs = (driverName, driverFlagDefs, driverFlagValues) => formatFlagsToArgs(excludeDefaultFlags(driverFlagDefs, driverFlagValues), driverFlagDefs, `${driverName}-`);
export function extractDriverFlags(flags, driver, options = { excludeDefaultValues: true }) {
    const driverStatic = machineDrivers[driver];
    const allDriverFlags = {
        ...driverStatic.flags,
        ...driverStatic.machineCreationFlags,
    };
    const driverPrefix = `${driver}-`;
    const driverFlagValues = Object.fromEntries(Object.entries(flags)
        .filter(([k]) => k.startsWith(driverPrefix))
        .map(([k, v]) => [k.substring(driverPrefix.length), v]));
    return options.excludeDefaultValues
        ? excludeDefaultFlags(allDriverFlags, driverFlagValues)
        : driverFlagValues;
}
//# sourceMappingURL=drivers.js.map