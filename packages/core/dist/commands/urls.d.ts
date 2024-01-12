/// <reference types="node" resolution-mode="require"/>
import retry from 'p-retry';
import { FlatTunnel } from '../tunneling/index.js';
export declare const urls: ({ serviceAndPort, tunnelingKey, includeAccessCredentials, retryOpts, showPreevyService, composeTunnelServiceUrl, }: {
    serviceAndPort?: {
        service: string;
        port?: number | undefined;
    } | undefined;
    tunnelingKey: string | Buffer;
    includeAccessCredentials: false | 'browser' | 'api';
    retryOpts: retry.Options;
    showPreevyService: boolean;
    composeTunnelServiceUrl: string;
}) => Promise<FlatTunnel[]>;
