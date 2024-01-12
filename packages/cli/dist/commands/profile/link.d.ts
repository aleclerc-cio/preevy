import ProfileCommand from '../../profile-command.js';
export default class Link extends ProfileCommand<typeof Link> {
    static flags: {
        'lc-api-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        'access-token': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        org: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static description: string;
    run(): Promise<unknown>;
}
