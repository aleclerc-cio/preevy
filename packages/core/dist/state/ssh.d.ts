import { SSHKeyConfig, SshKeyPairType } from '../ssh/keypair.js';
import { Store } from '../store/index.js';
export declare const sshKeysStore: (store: Store) => {
    readKey: (alias: string) => Promise<SSHKeyConfig | undefined>;
    writeKey: ({ alias, privateKey, publicKey }: SSHKeyConfig) => Promise<void>;
    upsertKey: (alias: string, type?: SshKeyPairType) => Promise<string>;
    deleteKey: (alias: string) => Promise<void>;
};
