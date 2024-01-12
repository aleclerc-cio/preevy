import { Help as OclifHelp } from '@oclif/core';
import { Topic } from '@oclif/core/lib/interfaces';
export default class Help extends OclifHelp {
    protected formatGlobalFlags(): string;
    showRootHelp(): Promise<void>;
    showTopicHelp(topic: Topic): Promise<void>;
}
