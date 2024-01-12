import { jest } from '@jest/globals';
export declare const mockFunction: <T extends (...args: never[]) => unknown>(impl?: T | undefined) => jest.MockedFunction<T>;
export type MockFunctions<T extends {}> = {
    [k in keyof T]: T[k] extends (...args: never[]) => unknown ? jest.MockedFunction<T[k]> : T[k] extends {} ? MockFunctions<T[k]> : T[k];
};
