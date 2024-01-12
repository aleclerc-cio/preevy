import { Logger } from '../log.js';
import { MachineBase } from './machine-model.js';
import { MachineConnection, MachineCreationDriver, MachineDriver } from './driver.js';
export declare const getUserAndGroup: (connection: Pick<MachineConnection, 'exec'>) => Promise<[string, string]>;
export declare const getDockerPlatform: (connection: Pick<MachineConnection, 'exec'>) => Promise<"linux/arm64" | "linux/amd64">;
export declare const ensureMachine: ({ machineDriver, machineCreationDriver, machineDriverName, envId, log, debug, }: {
    machineDriver: MachineDriver;
    machineCreationDriver: MachineCreationDriver;
    machineDriverName: string;
    envId: string;
    log: Logger;
    debug: boolean;
}) => Promise<{
    machine: MachineBase;
    connection: MachineConnection;
    userAndGroup: [string, string];
    dockerPlatform: string;
}>;
