import ProfileCommand from '../../profile-command.js';
export default class Urls extends ProfileCommand<typeof Urls> {
    static description: string;
    static flags: {
        sort: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        filter: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        columns: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        csv: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        extended: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'no-header': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'no-truncate': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        output: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'include-access-credentials': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'show-preevy-service-urls': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'access-credentials-type': import("@oclif/core/lib/interfaces").OptionFlag<"browser" | "api", import("@oclif/core/lib/interfaces").CustomOptions>;
        'output-urls-to': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'tunnel-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        'tls-hostname': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'insecure-skip-verify': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static strict: boolean;
    static hidden: boolean;
    static args: {
        service: import("@oclif/core/lib/interfaces").Arg<string | undefined, Record<string, unknown>>;
        port: import("@oclif/core/lib/interfaces").Arg<number | undefined, {
            max?: number | undefined;
            min?: number | undefined;
        }>;
        'compose-project': import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
