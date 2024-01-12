var _ProfileCommand_profileConfig, _ProfileCommand_store, _ProfileCommand_profile;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import path from 'path';
import { Flags } from '@oclif/core';
import { tryParseUrl, detectCiProvider, fsTypeFromUrl, localProfilesConfig, telemetryEmitter, } from '@preevy/core';
import { BaseCommand, text } from '@preevy/cli-common';
import { fsFromUrl } from './fs.js';
export const onProfileChange = (profile, profileStoreType) => {
    const ciProvider = detectCiProvider();
    if (ciProvider) {
        telemetryEmitter().identify(`ci_${ciProvider.id ?? 'unknown'}_${profile.id}`, {
            ci_provider: ciProvider.name,
        });
    }
    telemetryEmitter().group({ type: 'profile', id: profile.id }, {
        profile_driver: profile.driver,
        profile_id: profile.id,
        name: profile.id,
        profile_store_type: profileStoreType,
    });
};
export const loadProfileConfig = ({ dataDir }) => {
    const profileRoot = path.join(dataDir, 'v2');
    return localProfilesConfig(profileRoot, fsFromUrl);
};
const findAvailableProfileAlias = ({ existing, prefix }, index = 0) => {
    const candidate = [prefix, index].filter(Boolean).join('-');
    return existing.has(candidate) ? findAvailableProfileAlias({ existing, prefix }, index + 1) : candidate;
};
const findProfile = async ({ profileConfig, flags: { profile: profileFlag } }) => {
    const profileUrl = tryParseUrl(profileFlag || '');
    if (!profileUrl) {
        // eslint false positive here on case-sensitive filesystems due to unknown type
        // eslint-disable-next-line @typescript-eslint/return-await
        return await profileConfig.get(profileFlag);
    }
    const { profiles } = await profileConfig.list();
    const found = Object.values(profiles).find(p => p.location === profileFlag);
    if (found) {
        // eslint false positive here on case-sensitive filesystems due to unknown type
        // eslint-disable-next-line @typescript-eslint/return-await
        return await profileConfig.get(found.alias);
    }
    const newAlias = findAvailableProfileAlias({
        existing: new Set(Object.keys(profiles)),
        prefix: profileUrl.hostname,
    });
    // eslint false positive here on case-sensitive filesystems due to unknown type
    // eslint-disable-next-line @typescript-eslint/return-await
    return await profileConfig.importExisting(newAlias, profileUrl.toString());
};
class ProfileCommand extends BaseCommand {
    constructor() {
        super(...arguments);
        _ProfileCommand_profileConfig.set(this, void 0);
        _ProfileCommand_store.set(this, void 0);
        _ProfileCommand_profile.set(this, void 0);
    }
    async init() {
        await super.init();
        const { profileConfig, flags } = this;
        const profile = await findProfile({ profileConfig, flags });
        if (!profile) {
            return;
        }
        __classPrivateFieldSet(this, _ProfileCommand_profile, profile.info, "f");
        __classPrivateFieldSet(this, _ProfileCommand_store, profile.store, "f");
        onProfileChange(profile.info, fsTypeFromUrl(profile.location));
    }
    get profileConfig() {
        if (!__classPrivateFieldGet(this, _ProfileCommand_profileConfig, "f")) {
            __classPrivateFieldSet(this, _ProfileCommand_profileConfig, loadProfileConfig(this.config), "f");
        }
        return __classPrivateFieldGet(this, _ProfileCommand_profileConfig, "f");
    }
    get store() {
        if (!__classPrivateFieldGet(this, _ProfileCommand_store, "f")) {
            this.error('Store was not initialized');
        }
        return __classPrivateFieldGet(this, _ProfileCommand_store, "f");
    }
    get profile() {
        if (!__classPrivateFieldGet(this, _ProfileCommand_profile, "f")) {
            this.error(`Profile not initialized, run ${text.command(this.config, 'init')} to get started.`);
        }
        return __classPrivateFieldGet(this, _ProfileCommand_profile, "f");
    }
}
_ProfileCommand_profileConfig = new WeakMap(), _ProfileCommand_store = new WeakMap(), _ProfileCommand_profile = new WeakMap();
ProfileCommand.baseFlags = {
    ...BaseCommand.baseFlags,
    profile: Flags.string({
        description: 'Run in a specific profile context (either an alias or a URL)',
        required: false,
    }),
};
export default ProfileCommand;
//# sourceMappingURL=profile-command.js.map