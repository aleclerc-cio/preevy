/// <reference types="node" resolution-mode="require"/>
import { Store, VirtualFS } from '../store/index.js';
import { ProfileEditor } from './store.js';
import { Profile } from './profile.js';
type ProfileListEntry = {
    alias: string;
    id: string;
    location: string;
};
type ProfileList = {
    current: string | undefined;
    profiles: Record<string, ProfileListEntry>;
};
type GetResult = {
    alias: string;
    location: string;
    info: Profile;
    store: Store;
};
export type LocalProfilesConfigGetResult = GetResult;
export declare const localProfilesConfig: (localDir: string, fsFromUrl: (url: string, baseDir: string) => Promise<VirtualFS>) => {
    current(): Promise<ProfileListEntry | undefined>;
    setCurrent(alias: string): Promise<void>;
    list(): Promise<ProfileList>;
    has(alias: string): Promise<boolean>;
    get: {
        (alias: string | undefined): Promise<GetResult>;
        (alias: string | undefined, opts: {
            throwOnNotFound: false;
        }): Promise<GetResult>;
        (alias: string | undefined, opts: {
            throwOnNotFound: true;
        }): Promise<GetResult | undefined>;
    };
    delete(alias: string, opts?: {
        throwOnNotFound?: boolean;
    }): Promise<boolean>;
    importExisting(alias: string, fromLocation: string, makeCurrent?: boolean): Promise<GetResult>;
    create: (alias: string, location: string, profile: Omit<Profile, 'id'>, init: (pe: ProfileEditor) => Promise<void>, makeCurrent?: boolean) => Promise<{
        info: {
            driver?: string | undefined;
            id: string;
        };
        store: {
            ref: (dir: string) => {
                read: (file: string) => Promise<Buffer | undefined>;
            };
            transaction: <T>(dir: string, op: import("../store/index.js").TransactionOp<T>) => Promise<T>;
        };
    }>;
    copy: (source: {
        location: string;
    }, target: {
        alias: string;
        location: string;
    }, drivers: string[], makeCurrent?: boolean) => Promise<void>;
};
export type LocalProfilesConfig = ReturnType<typeof localProfilesConfig>;
export declare const nextAvailableAlias: (aliases: string[], prefix?: string, sep?: string) => string;
export {};
