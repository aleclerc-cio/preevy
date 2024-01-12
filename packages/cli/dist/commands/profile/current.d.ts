import ProfileCommand from '../../profile-command.js';
export default class CurrentProfile extends ProfileCommand<typeof CurrentProfile> {
    static description: string;
    static strict: boolean;
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
