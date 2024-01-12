import { FsReader } from './base.js';
export declare const jsonReader: (reader: FsReader) => {
    readJSON<T>(file: string): Promise<T | undefined>;
    readJsonOrThrow<T_1>(file: string): Promise<T_1>;
};
