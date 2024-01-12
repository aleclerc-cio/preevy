/// <reference types="node" resolution-mode="require"/>
import { Connection } from '../tunneling/index.js';
import { ComposeModel } from '../compose/index.js';
import { TunnelOpts } from '../ssh/index.js';
import { EnvId } from '../env-id.js';
export declare const agentServiceName = "preevy_proxy";
export declare function getPreevyAgentUrl(client: Connection['client'], envId: string): Promise<string>;
export declare function inspectRunningComposeApp(projectName: string): {
    getComposeNetworks: () => Promise<any>;
    getPreevyAgentContainer: () => Promise<{
        names: string;
        id: string;
        labels: Record<string, string>;
    } | null>;
    getEnvId: () => Promise<string | undefined>;
    getWorkingDirectory: () => Promise<string | undefined>;
    listAllContainers: () => Promise<{
        names: string;
        id: string;
        labels: Record<string, string>;
    }[]>;
};
export declare function initProxyComposeModel(opts: {
    envId: EnvId;
    projectName: string;
    tunnelOpts: TunnelOpts;
    tunnelingKeyThumbprint: string;
    debug?: boolean;
    privateMode?: boolean;
    networks: ComposeModel['networks'];
    version: string;
    injectLivecycleScript?: string;
    projectDirectory?: string;
}): Promise<{
    data: ComposeModel;
    write({ tunnelingKey, knownServerPublicKey }: {
        tunnelingKey: string | Buffer;
        knownServerPublicKey: string | Buffer;
    }): Promise<string>;
}>;
