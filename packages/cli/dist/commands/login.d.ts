import { BaseCommand } from '@preevy/cli-common';
export default class Login extends BaseCommand<typeof Login> {
    static description: string;
    static flags: {
        'lc-auth-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        'lc-api-url': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        'lc-client-id': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<void>;
}
