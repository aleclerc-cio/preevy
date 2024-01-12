import ProfileCommand from '../../profile-command.js';
export default class Disconnect extends ProfileCommand<typeof Disconnect> {
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
    };
    static strict: boolean;
    static hidden: boolean;
    static args: {
        'compose-project': import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    run(): Promise<unknown>;
}
