import { BaseCommand } from '@preevy/cli-common';
export default class ImportProfile extends BaseCommand<typeof ImportProfile> {
    static description: string;
    static flags: {
        name: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        use: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static args: {
        location: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    run(): Promise<void>;
}
