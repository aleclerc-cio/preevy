import DriverCommand from '../driver-command.js';
export default class Shell extends DriverCommand<typeof Shell> {
    static description: string;
    static aliases: string[];
    static hidden: boolean;
    static strict: boolean;
    static flags: {};
    static args: {
        envId: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
