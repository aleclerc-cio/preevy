/// <reference types="node" resolution-mode="require"/>
import { TunnelNameResolver } from '@preevy/common';
import { ComposeModel } from '../compose/model.js';
type port = string;
type url = string;
export type Tunnel = {
    project: string;
    service: string;
    ports: Record<port, url>;
};
export type FlatTunnel = {
    project: string;
    service: string;
    port: number;
    url: string;
};
export declare const flattenTunnels: (tunnels: Tunnel[]) => FlatTunnel[];
export declare const createTunnelingKey: () => Promise<Buffer>;
export declare const getTunnelNamesToServicePorts: (userModel: Pick<ComposeModel, 'services'>, tunnelNameForService: TunnelNameResolver) => {
    [k: string]: {
        port: number;
        name: string;
    };
};
export {};
