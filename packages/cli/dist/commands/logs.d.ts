import { Interfaces } from '@oclif/core';
import DriverCommand from '../driver-command.js';
export default class Logs extends DriverCommand<typeof Logs> {
    static description: string;
    static flags: {
        follow: Interfaces.BooleanFlag<boolean>;
        tail: Interfaces.OptionFlag<number | undefined, Interfaces.CustomOptions>;
        'no-log-prefix': Interfaces.BooleanFlag<boolean>;
        timestamps: Interfaces.BooleanFlag<boolean>;
        since: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        until: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        project: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        id: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    };
    static strict: boolean;
    static enableJsonFlag: boolean;
    static args: {
        services: Interfaces.Arg<string | undefined, Record<string, unknown>>;
    };
    run(): Promise<void>;
}
