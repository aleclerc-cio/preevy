/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { ProcessOutputBuffers } from '@preevy/common';
import childProcess, { ChildProcess, ExecOptions } from 'child_process';
import { Readable, Writable } from 'stream';
export declare const outputFromStdio: ({ stdout, stderr }: {
    stdout?: Readable | null | undefined;
    stderr?: Readable | null | undefined;
}) => ProcessOutputBuffers;
export declare class ProcessError extends Error {
    readonly process: childProcess.ChildProcess;
    readonly code: number | null;
    readonly signal: NodeJS.Signals | null;
    readonly output?: ProcessOutputBuffers | undefined;
    constructor(process: childProcess.ChildProcess, code: number | null, signal: NodeJS.Signals | null, output?: ProcessOutputBuffers | undefined);
    static calcMessage(command: string[], code: number | null, signal: NodeJS.Signals | null, output?: ProcessOutputBuffers): string;
}
export declare function childProcessPromise(p: ChildProcess, opts?: {
    captureOutput?: false;
}): Promise<ChildProcess>;
export declare function childProcessPromise(p: ChildProcess, opts: {
    captureOutput: true;
}): Promise<ChildProcess & {
    output: ProcessOutputBuffers;
}>;
export declare const childProcessStdoutPromise: (p: ChildProcess) => Promise<string>;
export declare const spawnPromise: (command: string, args: readonly string[], options: childProcess.SpawnOptions) => Promise<childProcess.ChildProcess>;
export declare const execPromise: typeof childProcess.exec.__promisify__;
export declare const execPromiseStdout: (command: string, opts?: Pick<ExecOptions, 'cwd'>) => Promise<string>;
export type PartialStdioStringOption = 'inherit' | 'ignore';
export type PartialStdioOptions = PartialStdioStringOption | [PartialStdioStringOption | Readable, PartialStdioStringOption | Writable, PartialStdioStringOption | Writable];
export declare const expandStdioOptions: (o: PartialStdioOptions) => {
    stdin: Readable;
    stdout: Writable;
    stderr: Writable;
};
