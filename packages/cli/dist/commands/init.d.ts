import { BaseCommand } from '@preevy/cli-common';
export default class Init extends BaseCommand {
    static description: string;
    static args: {
        'profile-alias': import("@oclif/core/lib/interfaces").Arg<string | undefined, Record<string, unknown>>;
    };
    static flags: {
        from: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<unknown>;
}
