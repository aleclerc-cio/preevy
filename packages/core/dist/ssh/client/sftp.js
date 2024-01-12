import ssh2 from 'ssh2';
import path from 'path';
import { promisify } from 'util';
import { pLimit } from '../../limit.js';
import { isDirEnt, normalizeDirInfo, normalizeFileInfo, pathFromStringOrFileInfo } from './files.js';
const handleCodeError = (...codes) => (err) => {
    const { code } = err;
    for (const [c, f] of codes) {
        if (code === c) {
            return f();
        }
    }
    throw err;
};
const mkdirAlreadyExistsHandler = handleCodeError([ssh2.utils.sftp.STATUS_CODE.FAILURE, () => undefined]);
const retryAfterCreatingParentDir = (f, createParentDir) => f().catch(handleCodeError([ssh2.utils.sftp.STATUS_CODE.NO_SUCH_FILE, async () => {
        await createParentDir();
        return await f();
    }]));
export const sftpClient = (ssh) => async ({ concurrency = 1 } = {}) => {
    const sftp = await promisify(ssh.sftp.bind(ssh))();
    const limit = pLimit(concurrency);
    const promisified = {
        putFile: promisify(sftp.fastPut.bind(sftp)),
        mkdir: promisify(sftp.mkdir.bind(sftp)),
        symlink: promisify(sftp.symlink.bind(sftp)),
    };
    const limited = {
        putFile: (...args) => limit(promisified.putFile, ...args),
        mkdir: (...args) => limit(promisified.mkdir, ...args),
        symlink: (...args) => limit(promisified.symlink, ...args),
    };
    const withParentDir = {
        putFile: async (local, remote, transferOptions) => await retryAfterCreatingParentDir(() => limited.putFile(local, remote, transferOptions), () => withParentDir.mkdir(path.dirname(remote), {})),
        mkdir: async (remote, options) => await retryAfterCreatingParentDir(() => limited.mkdir(remote, options).catch(mkdirAlreadyExistsHandler), () => withParentDir.mkdir(path.dirname(remote), options)),
    };
    const self = {
        mkdir: (remote) => withParentDir.mkdir(remote, {}),
        putFile: async ({ local, remote }, options = {}) => {
            const fileInfo = await normalizeFileInfo(local);
            options.progress?.emit('file', fileInfo.path);
            if (fileInfo.symlinkTarget) {
                return await limited.symlink(fileInfo.symlinkTarget, remote);
            }
            if (fileInfo.stats.isDirectory()) {
                return await self.putDirectory({ local: fileInfo, remote }, options);
            }
            const transferOptions = {
                mode: options.mode ?? fileInfo.stats.mode,
                chunkSize: options.chunkSize,
                step: options.progress
                    ? (_total, bytes) => options.progress?.emit('bytes', { bytes, file: fileInfo.path })
                    : undefined,
            };
            return await withParentDir.putFile(fileInfo.path, remote, transferOptions);
        },
        putDirectory: async ({ local, remote }, options = {}) => {
            const { entries, path: p } = await normalizeDirInfo(local);
            await self.mkdir(remote);
            options.progress?.emit('file', p);
            await Promise.all([
                ...entries.map(f => self.putFile({
                    local: isDirEnt(f) ? path.join(p, f.name) : f,
                    remote: path.posix.join(remote, pathFromStringOrFileInfo(f)),
                }, options)),
            ]);
            return undefined;
        },
        putFiles: async (files, options = {}) => await Promise.all(files.map(f => self.putFile(f, options))).then(() => undefined),
        [Symbol.dispose]: () => sftp.end(),
    };
    return self;
};
//# sourceMappingURL=sftp.js.map