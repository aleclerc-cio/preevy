import fs from 'fs';
export const undefinedOnNoEntError = (p) => p.catch(err => {
    if (err.code === 'ENOENT') {
        return undefined;
    }
    throw err;
});
export const lstatOrUndefined = (file) => undefinedOnNoEntError(fs.promises.lstat(file));
//# sourceMappingURL=files.js.map