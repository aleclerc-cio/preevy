/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { ChildProcess } from 'child_process';
import { ComposeModel } from './model.js';
declare class LoadComposeFileError extends Error {
    readonly cause: unknown;
    constructor(cause: unknown);
}
export declare class NoComposeFilesError extends LoadComposeFileError {
    constructor();
}
export declare const getExposedTcpServicePorts: (model: Pick<ComposeModel, 'services'>) => {
    name: string;
    ports: number[];
}[];
type Executer = (opts: {
    args: string[];
    stdin?: Buffer;
}) => Promise<string>;
declare const composeClient: (executer: Executer, composeFiles: string[] | Buffer) => {
    getModel: (services?: string[]) => Promise<ComposeModel>;
    getModelOrError: (services?: string[]) => Promise<ComposeModel | LoadComposeFileError>;
    getModelName: () => Promise<string>;
    getServiceLogs: (service: string) => Promise<string>;
    getServiceUrl: (service: string, port: number) => Promise<string>;
};
export type ComposeClient = ReturnType<typeof composeClient>;
export declare const localComposeClient: ({ composeFiles, projectName, env, projectDirectory }: {
    composeFiles: string[] | Buffer;
    projectName?: string | undefined;
    env?: NodeJS.ProcessEnv | undefined;
    projectDirectory?: string | undefined;
}) => {
    getModel: (services?: string[]) => Promise<ComposeModel>;
    getModelOrError: (services?: string[]) => Promise<ComposeModel | LoadComposeFileError>;
    getModelName: () => Promise<string>;
    getServiceLogs: (service: string) => Promise<string>;
    getServiceUrl: (service: string, port: number) => Promise<string>;
} & {
    getServiceLogsProcess: (service: string, opts?: import("child_process").SpawnOptions) => ChildProcess;
    spawn: (args: readonly string[], options: import("child_process").SpawnOptions) => ChildProcess;
    spawnPromise: (args: readonly string[], options: import("child_process").SpawnOptions) => Promise<ChildProcess>;
};
export {};
