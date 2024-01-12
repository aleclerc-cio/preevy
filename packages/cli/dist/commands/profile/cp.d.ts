import { BaseCommand } from '@preevy/cli-common';
import { LocalProfilesConfig } from '@preevy/core';
import { FsType } from '../../fs.js';
export default class CopyProfile extends BaseCommand<typeof CopyProfile> {
    static description: string;
    static enableJsonFlag: boolean;
    static flags: {
        profile: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'target-location': import("@oclif/core/lib/interfaces").OptionFlag<{
            location: string;
            fsType: FsType;
        } | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'target-storage': import("@oclif/core/lib/interfaces").OptionFlag<"local" | "s3" | "gs" | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        'target-name': import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        use: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    source(profileConfig: LocalProfilesConfig): Promise<{
        alias: string;
        location: string;
        driver?: string;
    }>;
    target(source: {
        alias: string;
        driver?: string;
    }): Promise<{
        location: string;
        alias: string;
    }>;
    run(): Promise<unknown>;
}
