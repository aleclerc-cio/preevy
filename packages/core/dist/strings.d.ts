export declare const truncatePrefix: (prefix: string, suffix: string, maxLength: number, separator?: string) => string;
export declare const truncateWithHash: (s: string, maxLength: number, hashLength?: number, separator?: string) => string;
export declare const alphabets: Readonly<{
    readonly alphanumeric: string;
    readonly lowercase: "abcdefghijklmnopqrstuvwxyz";
    readonly lowercaseNumeric: string;
}>;
export declare const randomString: ((alphabet: string, length: number) => string) & {
    readonly alphanumeric: (length: number) => string;
    readonly lowercase: (length: number) => string;
    readonly lowercaseNumeric: (length: number) => string;
};
