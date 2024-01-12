import { Command } from '@oclif/core';
export default class HelpCommand extends Command {
    static args: {
        commands: import("@oclif/core/lib/interfaces").Arg<string | undefined, Record<string, unknown>>;
    };
    static description: string;
    static flags: {
        'nested-commands': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static strict: boolean;
    run(): Promise<void>;
}
