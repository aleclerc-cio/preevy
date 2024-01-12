import { tmpdir } from 'os';
import path from 'path';
import { rimraf } from 'rimraf';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { mkdtemp } from 'fs/promises';
import tar from 'tar';
import { localFs } from './fs/index.js';
const readStream = (stream) => new Promise((resolve, reject) => {
    const buffer = [];
    stream.on('data', chunk => buffer.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(buffer)));
    stream.on('error', reject);
});
export const tarSnapshot = async (fs, filename) => {
    const transactionDir = await mkdtemp(path.join(tmpdir(), 'preevy-transactions-'));
    const existingTar = await fs.read(filename);
    if (existingTar) {
        await pipeline(Readable.from(existingTar), tar.x({
            cwd: transactionDir,
        }));
    }
    let dirty = false;
    const setDirty = (f) => (...args) => { dirty = true; return f(...args); };
    const save = async () => await fs.write(filename, await readStream(tar.c({
        cwd: transactionDir,
        prefix: '',
    }, ['.'])));
    const local = localFs(transactionDir);
    return {
        read: local.read,
        write: setDirty(local.write),
        delete: setDirty(local.delete),
        save: async () => {
            if (dirty) {
                await save();
            }
        },
        [Symbol.asyncDispose]: async () => {
            await rimraf(transactionDir);
        },
    };
};
//# sourceMappingURL=tar.js.map