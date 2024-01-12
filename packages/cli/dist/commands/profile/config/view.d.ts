import ProfileCommand from '../../../profile-command.js';
export default class ViewProfileConfig extends ProfileCommand<typeof ViewProfileConfig> {
    static description: string;
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
