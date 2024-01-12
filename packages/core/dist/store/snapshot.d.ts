import { VirtualFS } from './fs/index.js';
export type Snapshot = VirtualFS & AsyncDisposable & {
    save: () => Promise<void>;
};
export declare const snapshotStore: (snapshotter: () => Promise<Snapshot>) => {
    ref: () => Pick<Snapshot, 'read'>;
    transaction: <T>(op: (s: Pick<Snapshot, 'write' | 'delete' | 'read'>) => Promise<T>) => Promise<T>;
};
export type SnapshotStore = ReturnType<typeof snapshotStore>;
export type FileBackedSnapshotter = (fs: Pick<VirtualFS, 'read' | 'write'>, filename: string) => Promise<Snapshot>;
