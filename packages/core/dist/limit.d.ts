type LimitFunc<Arguments extends any[], ReturnType> = (fn: (...args: Arguments) => PromiseLike<ReturnType> | ReturnType, ...args: Arguments) => Promise<ReturnType>;
export declare const pLimit: <Arguments extends any[], ReturnType_1>(concurrency: number) => LimitFunc<Arguments, ReturnType_1>;
export {};
