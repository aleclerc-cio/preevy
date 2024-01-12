import { DirInfo, FileInfo } from './files.js';
export type Visitor<T extends {
    local: string | FileInfo | DirInfo;
}> = {
    visit: (file: T, fileInfo: FileInfo) => void;
    directoryEntry: (file: T, entry: string) => T;
};
export declare const fsWalker: <T extends {
    local: string | FileInfo | DirInfo;
}>(concurrency: number, visitor: Visitor<T>, filesToWalk: T[]) => Promise<void>;
