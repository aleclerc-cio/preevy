import fs from 'fs';
import PQueueModule from 'p-queue';
const PQueue = PQueueModule.default;
const readDir = async (filename) => await fs.promises.readdir(filename);
const normalizeFile = async (local) => {
    const result = typeof local === 'string'
        ? { path: local, stats: await fs.promises.lstat(local) }
        : local;
    if (result.stats.isSymbolicLink() && !result.symlinkTarget) {
        result.symlinkTarget = await fs.promises.readlink(result.path);
    }
    else if (result.stats.isDirectory() && !result.entries) {
        result.entries = await readDir(result.path);
    }
    return result;
};
const isDir = (f) => 'entries' in f;
export const fsWalker = (concurrency, visitor, filesToWalk) => {
    const queue = new PQueue({ concurrency });
    const walkFile = async (file) => {
        const fi = await normalizeFile(file.local);
        visitor.visit(file, fi);
        if (isDir(fi)) {
            // eslint-disable-next-line no-use-before-define
            void walkFiles(fi.entries.map(e => visitor.directoryEntry(file, e)));
        }
    };
    const walkFiles = (files) => {
        void queue.addAll(files.map(f => () => walkFile(f)));
    };
    walkFiles(filesToWalk);
    return queue.onIdle();
};
//# sourceMappingURL=walk.js.map