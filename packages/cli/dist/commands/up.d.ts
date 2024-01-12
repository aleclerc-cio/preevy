import MachineCreationDriverCommand from '../machine-creation-driver-command.js';
export default class Up extends MachineCreationDriverCommand<typeof Up> {
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
        'skip-volume': import("@oclif/core/lib/interfaces").OptionFlag<string[], import("@oclif/core/lib/interfaces").CustomOptions>;
        'skip-unchanged-files': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'enable-widget': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'livecycle-widget-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        'no-build': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        registry: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'registry-single-name': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'no-registry-single-name': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'no-registry-cache': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        builder: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'no-cache': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'tunnel-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        'tls-hostname': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'insecure-skip-verify': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        project: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        id: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static strict: boolean;
    static args: {
        service: import("@oclif/core/lib/interfaces").Arg<string | undefined, Record<string, unknown>>;
    };
    run(): Promise<unknown>;
}
