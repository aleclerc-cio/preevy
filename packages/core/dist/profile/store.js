import path from 'path';
import { formatPublicKey } from '@preevy/common';
import { jsonReader } from '../store/index.js';
const filenames = {
    info: 'info.json',
    driverDefaultFlags: (driver) => `${driver}-defaults.json`,
    tunnelingKey: 'tunneling-private-key',
    knownServerPublicKeys: (hostname, port) => path.join('known-hosts', [hostname, port].filter(Boolean).join('_')),
};
export const deleteFile = Symbol('delete');
const readLines = (buffer) => {
    if (!buffer) {
        return [];
    }
    return buffer?.toString('utf-8').split('\n').filter(Boolean);
};
const profileReader = (reader) => {
    const { readJsonOrThrow, readJSON } = jsonReader(reader);
    const info = async () => await readJsonOrThrow(filenames.info);
    return {
        info,
        driver: async () => (await info()).driver,
        defaultDriverFlags: async (driver) => await readJSON(filenames.driverDefaultFlags(driver)) ?? {},
        tunnelingKey: async () => {
            const tunnelingKey = await reader.read(filenames.tunnelingKey);
            if (!tunnelingKey) {
                throw new Error('Tunneling key is not configured correctly, please recreate the profile');
            }
            return tunnelingKey;
        },
        knownServerPublicKeys: async (hostname, port) => (readLines(await reader.read(filenames.knownServerPublicKeys(hostname, port)))).map(s => Buffer.from(s, 'utf-8')),
    };
};
const profileEditor = ({ read, write }) => {
    const r = profileReader({ read });
    return {
        info: () => ({
            read: r.info,
            write: async (profile) => {
                if (await read(filenames.info)) {
                    throw new Error('Existing profile found in store');
                }
                await write(filenames.info, JSON.stringify(profile));
            },
        }),
        driver: () => ({
            read: r.driver,
            write: async (driver) => await write(filenames.info, JSON.stringify({ ...await r.info(), driver })),
        }),
        defaultDriverFlags: (driver) => ({
            read: () => r.defaultDriverFlags(driver),
            write: async (flags) => await write(filenames.driverDefaultFlags(driver), JSON.stringify(flags)),
        }),
        tunnelingKey: () => ({
            read: r.tunnelingKey,
            write: async (key) => await write(filenames.tunnelingKey, key),
        }),
        knownServerPublicKeys: (hostname, port) => ({
            read: () => r.knownServerPublicKeys(hostname, port),
            write: async (newKeys) => {
                const keys = new Set(readLines(await read(filenames.knownServerPublicKeys(hostname, port))));
                newKeys.forEach(key => keys.add(formatPublicKey(key)));
                await write(filenames.knownServerPublicKeys(hostname, port), [...keys.values()].join('\n'));
            },
        }),
    };
};
const profileDir = 'profile';
export const profileStore = (store) => {
    const storeRef = store.ref(profileDir);
    const storeTransaction = async (op) => await store.transaction(profileDir, op);
    return {
        ref: profileReader(storeRef),
        transaction: (op) => storeTransaction(async (o) => await op(profileEditor(o))),
    };
};
//# sourceMappingURL=store.js.map