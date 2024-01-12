import { VirtualFS } from './base.js';
export declare const localFs: (baseDir: string) => VirtualFS;
export declare const localFsFromUrl: (baseDir: string, url: string) => VirtualFS;
