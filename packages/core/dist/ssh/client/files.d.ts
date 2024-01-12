/// <reference types="node" resolution-mode="require"/>
import fs from 'fs';
export type FileInfo = {
    path: string;
    stats: fs.Stats;
    symlinkTarget?: string;
};
export type DirInfo = FileInfo & {
    entries: (fs.Dirent | DirInfo)[];
};
export type DirToCopy = {
    local: string | FileInfo | DirInfo;
    remote: string;
};
export type FileToCopy = {
    local: string | FileInfo | DirInfo;
    remote: string;
};
export declare const readDir: (local: string) => Promise<fs.Dirent[]>;
export declare const normalizeFileInfo: (local: string | FileInfo | DirInfo) => Promise<FileInfo>;
export declare const normalizeDirInfo: (local: string | DirInfo | FileInfo) => Promise<DirInfo>;
export declare const isDirEnt: (x: fs.Dirent | DirInfo) => x is fs.Dirent;
export declare const expandFile: (local: string | DirInfo | FileInfo) => Promise<(FileInfo | DirInfo) & {
    size: number;
    numFiles: number;
}>;
export declare const pathFromStringOrFileInfo: (x: string | FileInfo | fs.Dirent) => string;
