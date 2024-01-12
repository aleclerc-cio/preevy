export declare const measureTime: <T>(f: () => Promise<T>) => Promise<{
    result: Awaited<T>;
    elapsedTimeSec: number;
}>;
