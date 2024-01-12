import { BaseCommand } from '@preevy/cli-common';
export default class Version extends BaseCommand<typeof Version> {
    static description: string;
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
