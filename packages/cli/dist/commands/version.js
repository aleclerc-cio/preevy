import { BaseCommand } from '@preevy/cli-common';
// eslint-disable-next-line no-use-before-define
class Version extends BaseCommand {
    async run() {
        const { flags } = this;
        const log = this.logger;
        if (flags.json) {
            return this.config.version;
        }
        log.info(this.config.version);
        return undefined;
    }
}
Version.description = 'Show Preevy version';
Version.enableJsonFlag = true;
export default Version;
//# sourceMappingURL=version.js.map