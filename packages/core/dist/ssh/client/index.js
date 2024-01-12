import ssh2 from 'ssh2';
import { sftpClient } from './sftp.js';
import { forwardOutStreamLocal } from './forward-out.js';
import { execCommand } from './exec.js';
export const connectSshClient = async ({ log, debug, ...connectConfig }) => {
    const ssh = new ssh2.Client();
    await new Promise((resolve, reject) => {
        ssh.on('ready', resolve);
        ssh.on('error', reject);
        ssh.connect({
            algorithms: {
                ...connectConfig.algorithms,
                compress: connectConfig.algorithms?.compress ?? ['zlib@openssh.com', 'zlib', 'none'],
            },
            ...connectConfig,
            debug: debug ? log.debug : undefined,
        });
    });
    const exec = execCommand(ssh);
    const sftp = sftpClient(ssh);
    const self = {
        sftp,
        exec,
        forwardOutStreamLocal: (listenAddress, remoteSocket) => forwardOutStreamLocal({ ssh, log, listenAddress, remoteSocket }),
        [Symbol.dispose]: () => { ssh.end(); },
    };
    return self;
};
//# sourceMappingURL=index.js.map