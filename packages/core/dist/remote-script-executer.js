import path from 'path';
import { randomBytes } from 'crypto';
import { mkdir } from './command-executer.js';
import { upload } from './upload-files/index.js';
export const scriptExecuter = ({ exec, log }) => async (script, opts = {}) => {
    const scriptFile = path.basename(script);
    const destination = `/tmp/scripts/${scriptFile}.${randomBytes(16).toString('hex')}`;
    log.debug(`executing script ${scriptFile} at ${destination}`);
    await mkdir(exec)(destination);
    await upload(exec, destination, [{ local: script, remote: scriptFile }]);
    try {
        return await exec(`pwd; env; ./${scriptFile}`, { cwd: destination, env: opts.env });
    }
    finally {
        await exec(`rm -rf ${destination}`);
    }
};
//# sourceMappingURL=remote-script-executer.js.map