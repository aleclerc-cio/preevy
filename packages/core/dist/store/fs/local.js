import fs from 'fs/promises';
import path, { dirname } from 'path';
import { rimraf } from 'rimraf';
const isNotFoundError = (e) => e?.code === 'ENOENT';
export const localFs = (baseDir) => ({
    read: async (filename) => {
        const filepath = path.join(baseDir, filename);
        try {
            return await fs.readFile(filepath);
        }
        catch (e) {
            if (isNotFoundError(e)) {
                return undefined;
            }
            throw e;
        }
    },
    write: async (filename, content) => {
        const filepath = path.join(baseDir, filename);
        const f = () => fs.writeFile(filepath, content);
        try {
            return await f();
        }
        catch (e) {
            if (isNotFoundError(e)) {
                return await fs.mkdir(dirname(filepath), { recursive: true }).then(f);
            }
            throw e;
        }
    },
    delete: async (filename) => {
        await rimraf(filename);
    },
});
export const localFsFromUrl = (baseDir, url) => localFs(path.join(baseDir, new URL(url).hostname));
//# sourceMappingURL=local.js.map