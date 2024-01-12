import { LogFunc } from './log.js';
export declare const logFunc: <Args extends unknown[], Return>(f: (...args: Args) => Return, opts?: {
    log?: LogFunc;
    name?: string;
}) => (...args: Args) => Return;
