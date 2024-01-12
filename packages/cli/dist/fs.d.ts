import { DriverName } from './drivers.js';
export declare const fsFromUrl: (url: string, localBaseDir: string) => Promise<import("@preevy/core").VirtualFS>;
export declare const fsTypes: readonly ["local", "s3", "gs"];
export type FsType = typeof fsTypes[number];
export declare const isFsType: (s: string) => s is "local" | "s3" | "gs";
export declare const chooseFsType: ({ driver }: {
    driver?: string | undefined;
}) => Promise<"local" | "s3" | "gs">;
type URL = `${string}://${string}`;
export type FsChooser = (opts: {
    profileAlias: string;
    driver?: {
        name: DriverName;
        flags: Record<string, unknown>;
    };
}) => Promise<URL>;
export declare const chooseFs: Record<FsType, FsChooser>;
export {};
