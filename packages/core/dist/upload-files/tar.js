import util from 'util';
import path from 'path';
import fs from 'fs';
import { platform } from 'os';
import { pack } from 'tar-stream';
import { pipeline } from 'stream';
import { transferProgressEmitter } from './progress.js';
import { fsWalker } from './walk.js';
const isWin = platform() === 'win32';
const headerFromStats = (local, remote) => {
    const { stats, symlinkTarget } = local;
    const header = {
        name: remote,
        mode: isWin ? 0o777 : stats.mode,
        mtime: stats.mtime,
        size: stats.size,
        uid: stats.uid,
        gid: stats.gid,
        type: 'file',
    };
    if (stats.isDirectory()) {
        header.type = 'directory';
    }
    else if (stats.isSymbolicLink()) {
        header.type = 'symlink';
        header.linkname = symlinkTarget;
        header.size = 0;
    }
    else if (stats.isFIFO()) {
        header.type = 'fifo';
    }
    else if (stats.isSocket()) {
        return undefined;
    }
    return header;
};
const addEntry = (p, emitter, header, filePath) => new Promise((resolve, reject) => {
    const stream = p.entry(header, err => {
        if (err) {
            p.destroy(err);
            reject(err);
            return;
        }
        resolve();
    });
    if (!stream) {
        process.stderr.write(`no stream: ${filePath}, ${util.inspect(stream)}, ${util.inspect(p)} ${util.inspect(header)}\n`);
        resolve();
        return;
    }
    if (header.type === 'file') {
        emitter.emit('file', filePath);
        const rs = fs.createReadStream(filePath);
        rs.on('data', chunk => { emitter.emit('bytes', { bytes: chunk.length, file: filePath }); });
        pipeline(rs, stream, err => {
            if (err) {
                p.destroy(err);
                reject(err);
            }
        });
    }
});
const chainPromise = () => {
    let pr = Promise.resolve();
    return {
        chain: (f) => { pr = pr.then(f); },
        promise: () => pr,
    };
};
export const tarStreamer = (initialFilesToCopy = []) => {
    const filesToCopy = [...initialFilesToCopy];
    const add = (fileToCopy) => { filesToCopy.push(fileToCopy); };
    const startStreaming = ({ out, concurrency, filter = (_f, r) => r }) => {
        const p = pack();
        const done = new Promise((resolve, reject) => {
            // make sure p is piped into another stream BEFORE any entries are added, otherwise the stream hangs
            pipeline(p, out, err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
        const emitter = transferProgressEmitter();
        const entriesPromise = chainPromise();
        const totals = { files: 0, bytes: 0 };
        const visitor = {
            visit: (fileToCopy, fi) => {
                const filterResult = filter(fi, fileToCopy.remote);
                if (!filterResult) {
                    return;
                }
                const header = headerFromStats(fi, filterResult);
                if (!header) {
                    return;
                }
                if (header.type === 'file') {
                    totals.files += 1;
                    totals.bytes += header.size ?? 0;
                }
                entriesPromise.chain(() => addEntry(p, emitter, header, fi.path));
            },
            directoryEntry: (file, entry) => ({
                local: path.join(file.local, entry),
                remote: path.posix.join(file.remote, entry),
            }),
        };
        const walkPromise = fsWalker(concurrency, visitor, filesToCopy);
        void walkPromise.then(() => {
            // must wait until all entries are added before calling p.finalize
            entriesPromise.chain(async () => { p.finalize(); });
        });
        return {
            done,
            emitter: emitter,
            totals: walkPromise.then(() => totals),
        };
    };
    return { add, startStreaming };
};
//# sourceMappingURL=tar.js.map