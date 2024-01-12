/// <reference types="node" resolution-mode="require"/>
import { Logger, TunnelOpts, Spinner, ProfileStore } from '@preevy/core';
export declare const connectToTunnelServerSsh: ({ tunnelOpts, log, tunnelingKey, profileStore, spinner }: {
    tunnelOpts: TunnelOpts;
    tunnelingKey: string | Buffer;
    profileStore: ProfileStore;
    log: Logger;
    spinner?: import("ora").Ora | undefined;
}) => Promise<import("@preevy/core").SshConnection>;
