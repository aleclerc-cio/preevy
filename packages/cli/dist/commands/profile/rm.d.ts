import ProfileCommand from '../../profile-command.js';
export default class RemoveProfile extends ProfileCommand<typeof RemoveProfile> {
    static description: string;
    static flags: {
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static args: {
        name: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    static strict: boolean;
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
