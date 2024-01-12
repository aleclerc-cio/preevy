export type AsyncObjectIterator<TObject, TResult> = (value: TObject[keyof TObject], key: string, collection: TObject) => Promise<TResult>;
export declare const asyncMapValues: <T extends object, TResult>(obj: T, callback: AsyncObjectIterator<T, TResult>) => Promise<{ [P in keyof T]: TResult; }>;
