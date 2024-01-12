export type GitAuthor = {
    name: string;
    email: string;
};
export type EnvGitMetadata = {
    ciProvider?: string;
    branch?: string;
    commit: string;
    author: GitAuthor;
    repoUrl?: string;
    pullRequestNumber?: number;
};
export declare const driverMetadataFilename = "driver-metadata.json";
export type EnvMachineMetadata = {
    driver: string;
    providerId: string;
    opts: Record<string, unknown>;
    locationDescription: string;
    creationTime: Date;
};
export type EnvMetadata = {
    id: string;
    git?: EnvGitMetadata;
    machine?: EnvMachineMetadata;
    lastDeployTime: Date;
    version: string;
    profileThumbprint?: string;
};
export declare const detectGitMetadata: (workingDir: string) => Promise<EnvGitMetadata | undefined>;
export declare const envMetadata: ({ envId, version, profileThumbprint, workingDir, }: {
    envId: string;
    version: string;
    profileThumbprint?: string | undefined;
    workingDir?: string | undefined;
}) => Promise<Omit<EnvMetadata, 'driver'>>;
