import path from 'path';
import { rimraf } from 'rimraf';
import { isEmpty, mapValues } from 'lodash-es';
import { find, range, map } from 'iter-tools-es';
import { localFs } from '../store/fs/local.js';
import { store, tarSnapshot } from '../store/index.js';
import { profileStore } from './store.js';
const listPersistence = ({ localDir }) => {
    const profileListFileName = 'profileList.json';
    const localStore = localFs(localDir);
    return {
        read: async () => {
            const readStr = await localStore.read(profileListFileName);
            if (!readStr) {
                return { current: undefined, profiles: {} };
            }
            const { current, profiles } = JSON.parse(readStr.toString());
            return {
                current,
                profiles: mapValues(profiles, (v, alias) => ({ ...v, alias })),
            };
        },
        write: async ({ profiles, current }) => {
            const written = {
                current,
                profiles: mapValues(profiles, ({ id, location }) => ({ id, location })),
            };
            await localStore.write(profileListFileName, JSON.stringify(written));
        },
    };
};
export const localProfilesConfig = (localDir, fsFromUrl) => {
    const localProfilesDir = path.join(localDir, 'profiles');
    const storeFromUrl = async (url) => store(async (dir) => await tarSnapshot(await fsFromUrl(url, localProfilesDir), dir));
    const listP = listPersistence({ localDir });
    async function get(alias, opts) {
        const throwOrUndefined = () => {
            if (opts?.throwOnNotFound) {
                throw new Error(`Profile ${alias} not found`);
            }
            return undefined;
        };
        const { profiles, current } = await listP.read();
        const aliasToGet = alias ?? current;
        if (!aliasToGet) {
            return throwOrUndefined();
        }
        const locationUrl = profiles[aliasToGet]?.location;
        if (!locationUrl) {
            return throwOrUndefined();
        }
        const tarSnapshotStore = await storeFromUrl(locationUrl);
        const profileInfo = await profileStore(tarSnapshotStore).ref.info();
        return {
            alias: aliasToGet,
            location: locationUrl,
            info: profileInfo,
            store: tarSnapshotStore,
        };
    }
    const create = async (alias, location, profile, init, makeCurrent = false) => {
        const { profiles, current } = await listP.read();
        if (profiles[alias]) {
            throw new Error(`Profile ${alias} already exists`);
        }
        const id = `${alias}-${Math.random().toString(36).substring(2, 9)}`;
        const tar = await storeFromUrl(location);
        const pStore = profileStore(tar);
        await pStore.transaction(async (op) => {
            await op.info().write({ id, ...profile });
            await init(op);
        });
        profiles[alias] = {
            alias,
            id,
            location,
        };
        await listP.write({ profiles, current: makeCurrent ? alias : current });
        return {
            info: {
                id,
                ...profile,
            },
            store: tar,
        };
    };
    const copy = async (source, target, drivers, makeCurrent = false) => {
        const sourceStore = await storeFromUrl(source.location);
        const sourceProfileStore = profileStore(sourceStore).ref;
        const { driver } = await sourceProfileStore.info();
        await create(target.alias, target.location, { driver }, async (pe) => {
            await pe.tunnelingKey().write(await sourceProfileStore.tunnelingKey());
            if (driver) {
                await pe.driver().write(driver);
            }
            await Promise.all(drivers.map(async (sourceDriver) => {
                const driverFlags = await sourceProfileStore.defaultDriverFlags(sourceDriver);
                if (!isEmpty(driverFlags)) {
                    await pe.defaultDriverFlags(sourceDriver).write(driverFlags);
                }
            }));
        }, makeCurrent);
    };
    return {
        async current() {
            const { profiles, current: currentAlias } = await listP.read();
            return currentAlias ? profiles[currentAlias] : undefined;
        },
        async setCurrent(alias) {
            const list = await listP.read();
            if (!list.profiles[alias]) {
                throw new Error(`Profile ${alias} doesn't exists`);
            }
            list.current = alias;
            await listP.write(list);
        },
        async list() {
            return await listP.read();
        },
        async has(alias) {
            return (await listP.read()).profiles?.[alias] !== undefined;
        },
        get,
        async delete(alias, opts = {}) {
            const list = await listP.read();
            const entry = list.profiles[alias];
            if (!entry) {
                if (opts.throwOnNotFound) {
                    throw new Error(`Profile ${alias} does not exist`);
                }
                return false;
            }
            delete list.profiles[alias];
            if (list.current === alias) {
                list.current = undefined;
            }
            await listP.write(list);
            if (entry.location.startsWith('local://')) {
                await rimraf(path.join(localProfilesDir, alias));
            }
            return true;
        },
        async importExisting(alias, fromLocation, makeCurrent = false) {
            const { profiles, current } = await listP.read();
            if (profiles[alias]) {
                throw new Error(`Profile ${alias} already exists`);
            }
            const tarSnapshotStore = await storeFromUrl(fromLocation);
            const info = await profileStore(tarSnapshotStore).ref.info();
            const newProfile = {
                id: info.id,
                alias,
                location: fromLocation,
            };
            profiles[alias] = newProfile;
            await listP.write({ profiles, current: makeCurrent ? alias : current });
            return {
                alias,
                location: fromLocation,
                info,
                store: tarSnapshotStore,
            };
        },
        create,
        copy,
    };
};
const DEFAULT_ALIAS_PREFIX = 'default';
export const nextAvailableAlias = (aliases, prefix = DEFAULT_ALIAS_PREFIX, sep = '-') => {
    const profiles = new Set(aliases);
    return find((alias) => !profiles.has(alias), map(suffix => [prefix, suffix].filter(Boolean).join(sep), range()));
};
//# sourceMappingURL=config.js.map