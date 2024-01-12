import { simpleEmitter, stateEmitter } from '@preevy/common';
import { map, reduce } from 'iter-tools-es';
export const transferProgressEmitter = () => simpleEmitter();
const ttlStore = (ttl) => {
    const store = new Set();
    return {
        add: (value) => {
            const item = { value };
            store.add(item);
            setTimeout(() => { store.delete(item); }, ttl);
        },
        all: () => map(({ value }) => value, store),
    };
};
const bytesPerSecSampleWindowInSeconds = 5;
export const expandedTransferProgressEmitter = (s) => {
    const e = stateEmitter({ bytes: 0, files: 0, currentFile: undefined, bytesPerSec: 0 });
    const lastChunks = ttlStore(bytesPerSecSampleWindowInSeconds * 1000);
    const calcBytesPerSec = () => reduce(0, (res, v) => res + v, lastChunks.all()) / bytesPerSecSampleWindowInSeconds;
    s.addListener('bytes', async ({ bytes, file: currentFile }) => {
        lastChunks.add(bytes);
        const bytesPerSec = calcBytesPerSec();
        const current = await e.current();
        const evt = { ...current, bytes: current.bytes + bytes, currentFile, bytesPerSec };
        e.emit(evt);
    });
    s.addListener('file', async (currentFile) => {
        const current = await e.current();
        e.emit({ ...current, files: current.files + 1, currentFile });
    });
    return e;
};
//# sourceMappingURL=progress.js.map