import path from 'path';
import fs from 'fs';
export const REMOTE_DIR_BASE = '/var/lib/preevy';
export const remoteProjectDir = (projectName) => path.posix.join(REMOTE_DIR_BASE, 'projects', projectName);
export const createCopiedFileInDataDir = ({ projectLocalDataDir }) => async (filename, content) => {
    const local = path.join(projectLocalDataDir, filename);
    const result = { local, remote: filename };
    await fs.promises.mkdir(path.dirname(local), { recursive: true });
    await fs.promises.writeFile(local, content, { flag: 'w' });
    return result;
};
//# sourceMappingURL=remote-files.js.map