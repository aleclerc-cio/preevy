import DriverCommand from '../driver-command.js';
export default class Purge extends DriverCommand<typeof Purge> {
    static description: string;
    static flags: {
        all: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        type: import("@oclif/core/lib/interfaces").OptionFlag<string[], import("@oclif/core/lib/interfaces").CustomOptions>;
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        wait: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static enableJsonFlag: boolean;
    static strict: boolean;
    run(): Promise<unknown>;
}
