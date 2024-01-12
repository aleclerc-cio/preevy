import { snapshotStore } from './snapshot.js';
export * from './tar.js';
export { jsonReader, fsTypeFromUrl, localFsFromUrl, localFs } from './fs/index.js';
export const store = (snapshotter) => {
    const s = (dir) => snapshotStore(() => snapshotter(dir));
    return ({
        ref: (dir) => ({
            read: async (file) => await (s(dir)).ref().read(file),
        }),
        transaction: async (dir, op) => await s(dir).transaction(op),
    });
};
//# sourceMappingURL=index.js.map