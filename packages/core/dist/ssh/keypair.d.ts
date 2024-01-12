/// <reference types="node" resolution-mode="require"/>
export type SshKeyPair = {
    privateKey: Buffer | string;
    publicKey: Buffer | string;
};
export type SshKeyPairType = 'rsa' | 'ed25519';
export declare const generateSshKeyPair: (type: SshKeyPairType) => Promise<{
    privateKey: string;
    publicKey: string;
}>;
export type SSHKeyConfig = SshKeyPair & {
    alias: string;
};
