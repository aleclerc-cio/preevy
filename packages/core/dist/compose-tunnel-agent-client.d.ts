import retry from 'p-retry';
import { MachineStatusCommand, ScriptInjection } from '@preevy/common';
import { ComposeModel, ComposeService } from './compose/model.js';
import { TunnelOpts } from './ssh/url.js';
import { EnvMetadata } from './env-metadata.js';
import { EnvId } from './env-id.js';
export declare const addBaseComposeTunnelAgentService: (model: ComposeModel) => ComposeModel;
export declare const addComposeTunnelAgentService: ({ tunnelOpts, sshPrivateKeyPath, knownServerPublicKeyPath, debug, user, envId, machineStatusCommand, envMetadata, composeModelPath, composeProject, profileThumbprint, privateMode, defaultAccess, scriptInjections, }: {
    tunnelOpts: TunnelOpts;
    sshPrivateKeyPath: string;
    knownServerPublicKeyPath: string;
    debug: boolean;
    user?: string | undefined;
    envId: EnvId;
    machineStatusCommand?: MachineStatusCommand | undefined;
    envMetadata: EnvMetadata;
    composeModelPath: string;
    composeProject: string;
    profileThumbprint?: string | undefined;
    privateMode: boolean;
    defaultAccess: 'private' | 'public';
    scriptInjections?: ((serviceName: string, serviceDef: ComposeService) => Record<string, ScriptInjection> | undefined) | undefined;
}, model: ComposeModel) => ComposeModel;
export declare const findComposeTunnelAgentUrl: (serviceUrls: {
    name: string;
    port: number;
    url: string;
}[]) => string;
export declare const queryTunnels: ({ retryOpts, composeTunnelServiceUrl, credentials, includeAccessCredentials, }: {
    composeTunnelServiceUrl: string;
    credentials: {
        user: string;
        password: string;
    };
    retryOpts?: retry.Options | undefined;
    includeAccessCredentials: false | 'browser' | 'api';
}) => Promise<{
    ports: {
        [x: string]: string;
    };
    project: string;
    service: string;
}[]>;
