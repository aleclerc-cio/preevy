/// <reference types="node" resolution-mode="require"/>
import { ux, Interfaces } from '@oclif/core';
import { FlatTunnel, Logger, TunnelOpts } from '@preevy/core';
import { HooksListeners, PluginContext } from '@preevy/cli-common';
import ProfileCommand from '../profile-command.js';
import { urlFlags } from '../common-flags.js';
export declare const writeUrlsToFile: ({ log }: {
    log: Logger;
}, { "output-urls-to": outputUrlsTo }: Interfaces.InferredFlags<Pick<typeof urlFlags, 'output-urls-to'>>, urls: FlatTunnel[]) => Promise<void>;
export declare const printUrls: (flatTunnels: FlatTunnel[], flags: Interfaces.InferredFlags<typeof ux.table.Flags> & {
    'include-access-credentials': boolean;
}) => void;
export declare const filterUrls: ({ flatTunnels, context, filters }: {
    flatTunnels: FlatTunnel[];
    context: PluginContext;
    filters: HooksListeners['filterUrls'];
}) => Promise<FlatTunnel[]>;
export default class Urls extends ProfileCommand<typeof Urls> {
    static description: string;
    static flags: {
        'include-access-credentials': Interfaces.BooleanFlag<boolean>;
        'show-preevy-service-urls': Interfaces.BooleanFlag<boolean>;
        'access-credentials-type': Interfaces.OptionFlag<"browser" | "api", Interfaces.CustomOptions>;
        'output-urls-to': Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        sort: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        filter: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        columns: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        csv: Interfaces.BooleanFlag<boolean>;
        extended: Interfaces.BooleanFlag<boolean>;
        'no-header': Interfaces.BooleanFlag<boolean>;
        'no-truncate': Interfaces.BooleanFlag<boolean>;
        output: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        'tunnel-url': Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        'tls-hostname': Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        'insecure-skip-verify': Interfaces.BooleanFlag<boolean>;
        project: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        id: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    };
    static enableJsonFlag: boolean;
    static args: {
        service: Interfaces.Arg<string | undefined, Record<string, unknown>>;
        port: Interfaces.Arg<number | undefined, {
            max?: number | undefined;
            min?: number | undefined;
        }>;
    };
    getComposeTunnelAgentUrl(envId: string, tunnelOpts: TunnelOpts, tunnelingKey: string | Buffer): Promise<string>;
    run(): Promise<unknown>;
}
