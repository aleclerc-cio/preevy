/// <reference types="node" resolution-mode="require"/>
import { MachineStatusCommand, ScriptInjection } from '@preevy/common';
import { MachineConnection } from '../driver/index.js';
import { ComposeModel } from './model.js';
import { TunnelOpts } from '../ssh/index.js';
import { Logger } from '../log.js';
import { FileToCopy } from '../upload-files/index.js';
import { EnvId } from '../env-id.js';
export declare const fetchRemoteUserModel: (connection: MachineConnection) => Promise<ComposeModel>;
export declare const defaultVolumeSkipList: string[];
export type SkippedVolume = {
    service: string;
    source: string;
    matchingRule: string;
};
type AgentSettings = {
    version: string;
    envId: EnvId;
    tunnelOpts: TunnelOpts;
    sshTunnelPrivateKey: string | Buffer;
    allowedSshHostKeys: Buffer;
    userAndGroup: [string, string];
    machineStatusCommand?: MachineStatusCommand;
    scriptInjections?: Record<string, ScriptInjection>;
    createCopiedFile: (filename: string, content: string | Buffer) => Promise<FileToCopy>;
};
export declare const remoteComposeModel: ({ debug, userSpecifiedProjectName, userSpecifiedServices, volumeSkipList, composeFiles, log, cwd, expectedServiceUrls, projectName, agentSettings, modelFilter, }: {
    debug: boolean;
    userSpecifiedProjectName: string | undefined;
    userSpecifiedServices: string[];
    volumeSkipList: string[];
    composeFiles: string[];
    log: Logger;
    cwd: string;
    expectedServiceUrls: {
        name: string;
        port: number;
        url: string;
    }[];
    projectName: string;
    agentSettings?: AgentSettings | undefined;
    modelFilter: (userModel: ComposeModel) => Promise<ComposeModel>;
}) => Promise<{
    model: ComposeModel;
    filesToCopy: FileToCopy[];
    skippedVolumes: SkippedVolume[];
    linkEnvVars: {
        [k: string]: string;
    };
}>;
export {};
