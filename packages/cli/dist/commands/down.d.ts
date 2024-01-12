import DriverCommand from '../driver-command.js';
export default class Down extends DriverCommand<typeof Down> {
    static description: string;
    static flags: {
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        wait: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        project: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        id: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static args: {};
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
