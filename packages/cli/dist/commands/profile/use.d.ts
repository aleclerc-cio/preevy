import { BaseCommand } from '@preevy/cli-common';
export default class UseProfile extends BaseCommand<typeof UseProfile> {
    static description: string;
    static args: {
        name: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    run(): Promise<unknown>;
}
