/// <reference types="node" resolution-mode="require"/>
import { BaseSshClient, SshConnectionConfig } from '@preevy/common';
import { Logger } from '../log.js';
import { TunnelOpts } from '../ssh/index.js';
export declare class UnverifiedHostKeyError extends Error {
    readonly tunnelOpts: TunnelOpts;
    readonly hostKeySignature: string;
    constructor(tunnelOpts: TunnelOpts, hostKeySignature: string);
}
export type HostKeySignatureConfirmer = (o: {
    hostKeyFingerprint: string;
    hostname: string;
    port: number | undefined;
}) => Promise<boolean>;
export type Connection = {
    client: Pick<BaseSshClient, 'execHello' | 'execTunnelUrl' | 'end'>;
    hostKey: Buffer;
};
export declare const connectToTunnelServerSsh: ({ log, tunnelOpts, connectionOpts, clientPrivateKey, username, knownServerPublicKeys, confirmHostFingerprint, }: {
    log: Logger;
    tunnelOpts: Pick<TunnelOpts, 'url' | 'tlsServerName' | 'insecureSkipVerify'>;
    connectionOpts: Pick<SshConnectionConfig, 'hostname' | 'port' | 'isTls'>;
    clientPrivateKey: string | Buffer;
    username: string;
    knownServerPublicKeys: readonly Buffer[];
    confirmHostFingerprint: HostKeySignatureConfirmer;
}) => Promise<false | Connection>;
