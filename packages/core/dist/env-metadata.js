import { gitContext } from './git.js';
import { detectCiProvider } from './ci-providers/index.js';
export const driverMetadataFilename = 'driver-metadata.json';
export const detectGitMetadata = async (workingDir) => {
    const git = gitContext(workingDir);
    const ciProvider = detectCiProvider();
    const branch = await git.branchName();
    if (!branch) {
        return undefined;
    }
    const commit = ciProvider?.gitCommit() ?? await git.commit();
    return {
        ciProvider: ciProvider?.id,
        branch: ciProvider?.branchName() ?? branch,
        commit,
        author: await git.author(commit),
        pullRequestNumber: ciProvider?.pullRequestNumber(),
        repoUrl: ciProvider?.repoUrl() || await git.remoteTrackingBranchUrl(),
    };
};
export const envMetadata = async ({ envId, version, profileThumbprint, workingDir = process.cwd(), }) => ({
    id: envId,
    git: await detectGitMetadata(workingDir),
    lastDeployTime: new Date(),
    version,
    profileThumbprint,
});
//# sourceMappingURL=env-metadata.js.map