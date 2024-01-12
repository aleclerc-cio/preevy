import { Command, Interfaces } from '@oclif/core';
import { LocalProfilesConfig, Profile, Store } from '@preevy/core';
import { BaseCommand } from '@preevy/cli-common';
export declare const onProfileChange: (profile: Profile, profileStoreType: string) => void;
export declare const loadProfileConfig: ({ dataDir }: {
    dataDir: string;
}) => LocalProfilesConfig;
export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof ProfileCommand['baseFlags'] & T['flags']>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;
declare abstract class ProfileCommand<T extends typeof Command> extends BaseCommand<T> {
    #private;
    static baseFlags: {
        profile: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        'enable-plugin': Interfaces.OptionFlag<string[], Interfaces.CustomOptions>;
        'disable-plugin': Interfaces.OptionFlag<string[] | undefined, Interfaces.CustomOptions>;
        project: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        file: Interfaces.OptionFlag<string[] | undefined, Interfaces.CustomOptions>;
        'system-compose-file': Interfaces.OptionFlag<string[] | undefined, Interfaces.CustomOptions>;
        'log-level': Interfaces.OptionFlag<"debug" | "info" | "warn" | "error" | undefined, Interfaces.CustomOptions>;
        debug: Interfaces.BooleanFlag<boolean>;
    };
    protected flags: Flags<T>;
    protected args: Args<T>;
    init(): Promise<void>;
    get profileConfig(): LocalProfilesConfig;
    get store(): Store;
    get profile(): Profile;
}
export default ProfileCommand;
