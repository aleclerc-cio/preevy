export declare const logLevels: {
    readonly debug: 10;
    readonly info: 20;
    readonly warn: 30;
    readonly error: 40;
};
export type LogLevel = keyof typeof logLevels;
export type LogFunc = (message?: string, ...args: unknown[]) => void;
export declare const nullLogFunc: LogFunc;
export type Logger = {
    [level in LogLevel]: LogFunc;
};
