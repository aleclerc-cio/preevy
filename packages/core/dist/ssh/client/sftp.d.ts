import ssh2 from 'ssh2';
import { DirToCopy, FileToCopy } from './files.js';
import { TransferOptions } from './transfer.js';
export declare const sftpClient: (ssh: ssh2.Client) => ({ concurrency }?: {
    concurrency?: number | undefined;
}) => Promise<{
    mkdir: (remote: string) => Promise<void>;
    putFile: ({ local, remote }: FileToCopy, options?: TransferOptions) => Promise<void>;
    putDirectory: ({ local, remote }: DirToCopy, options?: TransferOptions) => Promise<void>;
    putFiles: (files: FileToCopy[], options?: TransferOptions) => Promise<void>;
    [Symbol.dispose]: () => void;
}>;
export type SftpClient = Awaited<ReturnType<ReturnType<typeof sftpClient>>>;
