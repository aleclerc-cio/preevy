/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import stream from 'stream';
import { OrderedOutput } from '@preevy/common';
export type ExecResult = {
    stdout: string;
    stderr: string;
    output: string;
} & ({
    code: number;
} | {
    signal: string;
});
export declare const execResultFromOrderedOutput: (oo: OrderedOutput, encoding?: BufferEncoding) => Pick<ExecResult, 'output' | 'stderr' | 'stdout'>;
export type ExecOptions = {
    cwd?: string;
    stdin?: string | Buffer | stream.Readable;
    env?: Record<string, string | undefined>;
    encoding?: BufferEncoding;
    ignoreExitCode?: boolean;
    asRoot?: boolean;
};
export type CommandExecuter = (command: string, options?: ExecOptions) => Promise<ExecResult>;
export declare class CommandError extends Error {
    readonly command: string;
    constructor(command: string, field: 'code' | 'signal', value: number | string, message: string);
}
export declare const checkResult: (command: string, result: ExecResult) => {
    stdout: string;
    stderr: string;
    output: string;
} & {
    code: number;
};
export declare const commandWith: (command: string, { env, cwd, asRoot }: Pick<ExecOptions, 'env' | 'cwd' | 'asRoot'>) => string;
export declare const mkdir: (exec: CommandExecuter) => (...dirs: string[]) => Promise<ExecResult>;
