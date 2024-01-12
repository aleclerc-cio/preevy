/// <reference types="node" resolution-mode="require"/>
import { MachineStatusCommand, ScriptInjection } from '@preevy/common';
import { TunnelOpts } from '../ssh/index.js';
import { ComposeModel } from '../compose/index.js';
import { MachineConnection } from '../driver/index.js';
import { Logger } from '../log.js';
import { EnvId } from '../env-id.js';
import { BuildSpec } from '../build/index.js';
declare const up: ({ debug, machineStatusCommand, userAndGroup, dockerPlatform, connection, tunnelOpts, userSpecifiedProjectName, userSpecifiedServices, volumeSkipList, scriptInjections, composeFiles, log, dataDir, allowedSshHostKeys, sshTunnelPrivateKey, cwd, skipUnchangedFiles, version, envId, expectedServiceUrls, projectName, buildSpec, modelFilter, }: {
    debug: boolean;
    machineStatusCommand?: MachineStatusCommand | undefined;
    userAndGroup: [string, string];
    dockerPlatform: string;
    connection: Pick<MachineConnection, 'exec' | 'dockerSocket'>;
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
    skipUnchangedFiles: boolean;
    version: string;
    envId: EnvId;
    expectedServiceUrls: {
        name: string;
        port: number;
        url: string;
    }[];
    projectName: string;
    buildSpec?: BuildSpec | undefined;
    modelFilter: (userModel: ComposeModel) => Promise<ComposeModel>;
}) => Promise<{
    composeModel: ComposeModel;
    projectLocalDataDir: string;
}>;
export default up;
