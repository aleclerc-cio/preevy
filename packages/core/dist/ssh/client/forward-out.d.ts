/// <reference types="node" resolution-mode="require"/>
import { AddressInfo, ListenOptions } from 'net';
import ssh2 from 'ssh2';
import { Logger } from '../../log.js';
export type ForwardOutStreamLocal = AsyncDisposable & {
    localSocket: string | AddressInfo;
};
export declare const forwardOutStreamLocal: ({ ssh, log, listenAddress, remoteSocket, onClose }: {
    ssh: ssh2.Client;
    log: Logger;
    listenAddress: string | number | ListenOptions;
    remoteSocket: string;
    onClose?: (() => void) | undefined;
}) => Promise<ForwardOutStreamLocal>;
