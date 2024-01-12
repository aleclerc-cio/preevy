/// <reference types="node" resolution-mode="require"/>
import { MachineStatusCommand, ScriptInjection } from '@preevy/common';
import { TunnelOpts } from '../ssh/index.js';
import { ComposeModel } from '../compose/index.js';
import { Logger } from '../log.js';
import { EnvId } from '../env-id.js';
declare const composeModel: ({ debug, machineStatusCommand, userAndGroup, tunnelOpts, userSpecifiedProjectName, userSpecifiedServices, volumeSkipList, scriptInjections, composeFiles, log, dataDir, allowedSshHostKeys: hostKey, sshTunnelPrivateKey, cwd, version, envId, expectedServiceUrls, projectName, modelFilter, }: {
    debug: boolean;
    machineStatusCommand?: MachineStatusCommand | undefined;
    userAndGroup: [string, string];
    tunnelOpts: TunnelOpts;
    userSpecifiedProjectName: string | undefined;
    userSpecifiedServices: string[];
    volumeSkipList: string[];
    composeFiles: string[];
    log: Logger;
    dataDir: string;
    scriptInjections?: Record<string, ScriptInjection> | undefined;
    sshTunnelPrivateKey: string | Buffer;
    allowedSshHostKeys: Buffer;
    cwd: string;
    version: string;
    envId: EnvId;
    expectedServiceUrls: {
        name: string;
        port: number;
        url: string;
    }[];
    projectName: string;
    modelFilter: (userModel: ComposeModel) => Promise<ComposeModel>;
}) => Promise<{
    projectLocalDataDir: string;
    createCopiedFile: (filename: string, content: string | Buffer) => Promise<{
        local: string;
        remote: string;
    }>;
    model: ComposeModel;
    filesToCopy: import("../upload-files/files.js").FileToCopy[];
    skippedVolumes: import("../compose/remote.js").SkippedVolume[];
    linkEnvVars: {
        [k: string]: string;
    };
}>;
export default composeModel;
