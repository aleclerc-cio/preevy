/// <reference types="node" resolution-mode="require"/>
import { Profile } from './profile.js';
import { Store } from '../store/index.js';
import { FsReader } from '../store/fs/base.js';
export declare const deleteFile: unique symbol;
export type DeleteFile = typeof deleteFile;
declare const profileReader: (reader: FsReader) => {
    info: () => Promise<Profile>;
    driver: () => Promise<string | undefined>;
    defaultDriverFlags: (driver: string) => Promise<Record<string, unknown>>;
    tunnelingKey: () => Promise<Buffer>;
    knownServerPublicKeys: (hostname: string, port: number | undefined) => Promise<Buffer[]>;
};
export type ProfileReader = ReturnType<typeof profileReader>;
type ProfileKey = keyof ProfileReader;
type ProfileKeyArgs = {
    [K in ProfileKey]: Parameters<ProfileReader[K]>;
};
type ProfileKeyValue = {
    [K in ProfileKey]: Awaited<ReturnType<ProfileReader[K]>>;
};
export type ProfileEditor = {
    [K in ProfileKey]: (...args: ProfileKeyArgs[K]) => {
        read: () => Promise<ProfileKeyValue[K]>;
        write: (val: ProfileKeyValue[K]) => Promise<void>;
    };
};
export type ProfileEditorOp<T extends ProfileKey = ProfileKey, Result = void> = (pe: Pick<ProfileEditor, T>) => Promise<Result>;
export declare const profileStore: (store: Store) => {
    ref: {
        info: () => Promise<Profile>;
        driver: () => Promise<string | undefined>;
        defaultDriverFlags: (driver: string) => Promise<Record<string, unknown>>;
        tunnelingKey: () => Promise<Buffer>;
        knownServerPublicKeys: (hostname: string, port: number | undefined) => Promise<Buffer[]>;
    };
    transaction: <T>(op: ProfileEditorOp<"info" | "knownServerPublicKeys" | "driver" | "defaultDriverFlags" | "tunnelingKey", T>) => Promise<T>;
};
export type ProfileStore = ReturnType<typeof profileStore>;
export type ProfileStoreRef = ProfileStore['ref'];
export type ProfileStoreTransaction = ProfileStore['transaction'];
export {};
