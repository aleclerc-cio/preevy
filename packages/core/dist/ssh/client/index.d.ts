/// <reference types="node" resolution-mode="require"/>
import ssh2 from 'ssh2';
import { ListenOptions } from 'net';
import { Logger } from '../../log.js';
export { FileToCopy } from './files.js';
export declare const connectSshClient: ({ log, debug, ...connectConfig }: Omit<ssh2.ConnectConfig, "debug"> & {
    log: Logger;
    debug: boolean;
}) => Promise<{
    sftp: ({ concurrency }?: {
        concurrency?: number | undefined;
    }) => Promise<{
        mkdir: (remote: string) => Promise<void>;
        putFile: ({ local, remote }: import("./files.js").FileToCopy, options?: import("./transfer.js").TransferOptions) => Promise<void>;
        putDirectory: ({ local, remote }: import("./files.js").DirToCopy, options?: import("./transfer.js").TransferOptions) => Promise<void>;
        putFiles: (files: import("./files.js").FileToCopy[], options?: import("./transfer.js").TransferOptions) => Promise<void>;
        [Symbol.dispose]: () => void;
    }>;
    exec: import("../../command-executer.js").CommandExecuter;
    forwardOutStreamLocal: (listenAddress: string | number | ListenOptions, remoteSocket: string) => Promise<import("./forward-out.js").ForwardOutStreamLocal>;
    [Symbol.dispose]: () => void;
}>;
export type SshClient = Awaited<ReturnType<typeof connectSshClient>>;
