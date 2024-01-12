/// <reference types="node" resolution-mode="require"/>
import fs from 'fs';
export declare const undefinedOnNoEntError: <T>(p: Promise<T>) => Promise<T | undefined>;
export declare const lstatOrUndefined: (file: string) => Promise<fs.Stats | undefined>;
