/// <reference types="node" resolution-mode="require"/>
import { Snapshot } from './snapshot.js';
export * from './tar.js';
export { VirtualFS, jsonReader, fsTypeFromUrl, localFsFromUrl, localFs, FsReader } from './fs/index.js';
export type TransactionOp<T> = (s: Pick<Snapshot, 'write' | 'delete' | 'read'>) => Promise<T>;
export declare const store: (snapshotter: (dir: string) => Promise<Snapshot>) => {
    ref: (dir: string) => {
        read: (file: string) => Promise<Buffer | undefined>;
    };
    transaction: <T>(dir: string, op: TransactionOp<T>) => Promise<T>;
};
export type Store = ReturnType<typeof store>;
