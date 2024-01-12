import { Options as RetryOptions } from 'p-retry';
import { Store } from '../store/index.js';
import { SshKeyPair } from '../ssh/index.js';
import { MachineConnection, MachineDriver } from './driver.js';
import { MachineBase } from './machine-model.js';
import { Logger } from '../log.js';
export type SshMachine = MachineBase & {
    version: string;
    publicIPAddress: string;
    sshKeyName: string;
    sshUsername: string;
};
type SshDriver = Pick<MachineDriver<SshMachine>, 'spawnRemoteCommand'> & {
    connect: (machine: MachineBase, opts: {
        log: Logger;
        debug: boolean;
        retryOpts?: RetryOptions;
    }) => Promise<MachineConnection>;
};
export declare const sshDriver: ({ getSshKey }: {
    getSshKey: (machine: SshMachine) => Promise<Pick<SshKeyPair, 'privateKey'>>;
}) => SshDriver;
export declare const getStoredKeyOrUndefined: (store: Store, alias: string) => Promise<import("../ssh/keypair.js").SSHKeyConfig | undefined>;
export declare const getStoredKey: (store: Store, alias: string) => Promise<import("../ssh/keypair.js").SSHKeyConfig>;
export {};
