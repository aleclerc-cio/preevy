import { CommandHelp as BaseCommandHelp, Help as OclifHelp } from '@oclif/core';
import { BaseCommand, text } from '@preevy/cli-common';
class GlobalFlagsHelp extends BaseCommandHelp {
    constructor(command, config, opts) {
        super(command, config, opts);
    }
    globalFlags() {
        const flags = Object.entries(BaseCommand.baseFlags).map(([name, value]) => ({ ...value, name }));
        return this.flags(flags);
    }
}
export default class Help extends OclifHelp {
    formatGlobalFlags() {
        return this.section('GLOBAL FLAGS', new GlobalFlagsHelp(this.config.commands[0], this.config, this.opts).globalFlags());
    }
    async showRootHelp() {
        if (!this.opts.stripAnsi) {
            this.log(text.logo);
        }
        await super.showRootHelp();
        this.log(this.formatGlobalFlags());
        this.log('');
    }
    async showTopicHelp(topic) {
        await super.showTopicHelp(topic);
        this.log(this.formatGlobalFlags());
        this.log('');
    }
}
//# sourceMappingURL=help.js.map