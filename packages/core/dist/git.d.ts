export declare function gitContext(cwd?: string): {
    branchName: () => Promise<string | undefined>;
    commit: ({ short }?: {
        short?: boolean | undefined;
    }) => Promise<string | undefined>;
    author: (commit?: string) => Promise<{
        name: string;
        email: string;
    } | undefined>;
    remoteTrackingBranchUrl: (localBranch?: string) => Promise<string | undefined>;
    localChanges: () => Promise<string>;
};
export type GitContext = ReturnType<typeof gitContext>;
