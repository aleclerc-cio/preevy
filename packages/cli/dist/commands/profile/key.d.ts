import ProfileCommand from '../../profile-command.js';
export default class Key extends ProfileCommand<typeof Key> {
    static description: string;
    static strict: boolean;
    static enableJsonFlag: boolean;
    static args: {
        type: import("@oclif/core/lib/interfaces").Arg<"private" | "public-pem" | "public-ssh" | "thumbprint" | "thumbprint-uri" | undefined, Record<string, unknown>>;
    };
    run(): Promise<unknown>;
}
