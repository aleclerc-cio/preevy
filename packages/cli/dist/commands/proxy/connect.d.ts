import ProfileCommand from '../../profile-command.js';
export default class Connect extends ProfileCommand<typeof Connect> {
    static description: string;
    static flags: {
        id: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'enable-widget': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'livecycle-widget-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        'private-env': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
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
        'compose-project': import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
