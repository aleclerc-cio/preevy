import fs from 'fs';
import path from 'path';
import { sumArray } from '../../array.js';
export const readDir = async (local) => await fs.promises.readdir(local, { withFileTypes: true });
export const normalizeFileInfo = async (local) => {
    const result = typeof local === 'string'
        ? { path: local, stats: await fs.promises.lstat(local) }
        : local;
    if (result.stats.isSymbolicLink() && !result.symlinkTarget) {
        result.symlinkTarget = await fs.promises.readlink(result.path);
    }
    return result;
};
export const normalizeDirInfo = async (local) => {
    const result = typeof local === 'string'
        ? await normalizeFileInfo(local)
        : local;
    if (!('entries' in result)) {
        Object.assign(result, { entries: await readDir(result.path) });
    }
    return result;
};
export const isDirEnt = (x) => 'isDirectory' in x;
const expandDir = async (local) => {
    const di = await normalizeDirInfo(local);
    const entries = await Promise.all(
    // eslint-disable-next-line no-use-before-define
    di.entries.map(e => expandFile(isDirEnt(e) ? path.posix.join(di.path, e.name) : e)));
    return {
        ...di,
        entries,
        size: sumArray(entries.map(e => e.size)),
        numFiles: sumArray(entries.map(e => e.numFiles)) + 1,
    };
};
export const expandFile = async (local) => {
    const fi = await normalizeFileInfo(local);
    return fi.stats.isDirectory() ? await expandDir(fi)
        : { ...fi, size: fi.symlinkTarget ? 0 : fi.stats.size, numFiles: 1 };
};
export const pathFromStringOrFileInfo = (x) => {
    if (typeof x === 'string') {
        return x;
    }
    if ('name' in x) {
        return x.name;
    }
    return x.path;
};
//# sourceMappingURL=files.js.map