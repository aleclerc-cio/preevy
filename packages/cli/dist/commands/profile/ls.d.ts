import ProfileCommand from '../../profile-command.js';
export default class ListProfile extends ProfileCommand<typeof ListProfile> {
    static description: string;
    static enableJsonFlag: boolean;
    static flags: {
        json: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        sort: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        filter: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        columns: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        csv: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        extended: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'no-header': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'no-truncate': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        output: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<unknown>;
}
