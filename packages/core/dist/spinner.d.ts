import ora from 'ora';
export type SpinnerOptions = ora.Options & {
    opPrefix?: string;
};
export type Spinner = ora.Ora;
export declare const spinner: (opts?: SpinnerOptions) => Spinner;
export declare const withSpinner: <T>(fn: (spinner: Spinner) => Promise<T>, opts?: ora.Options & {
    opPrefix?: string | undefined;
} & {
    successText?: string | ((result: T) => string) | ((result: T) => Promise<string>) | undefined;
    disable?: boolean | undefined;
}) => Promise<T>;
