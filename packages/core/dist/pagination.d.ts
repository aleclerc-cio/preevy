export type Page<T> = {
    items: T[];
    nextPageToken?: string;
};
export declare const paginationIterator: <T, P extends Page<T>>(fetch: (continueToken?: string) => Promise<P>) => AsyncIterableIterator<T>;
