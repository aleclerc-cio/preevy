/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import fs from 'fs';
type FilterStoreEntry = {
    size: number;
    mtimeSecondsSinceEpoch: number;
    symlinkTarget?: string;
    isDir: boolean;
};
export type FilterStore = Map<string, FilterStoreEntry>;
export declare const filterCommand = "find . -print0 | xargs -r0 stat -c '%s %Y \"%F\" %N'";
export declare const filterStore: (from: string | Buffer | Map<string, FilterStoreEntry>) => {
    has: (fi: {
        stats: fs.Stats;
        symlinkTarget?: string;
    }, name: string) => boolean;
};
export {};
