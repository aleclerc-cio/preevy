import { stringOrUndefinedToNumber } from './common.js';
// https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
export const azurePipelinesCiProvider = () => ({
    name: 'Azure Pipelines',
    id: 'azurepipelines',
    currentlyRunningInProvider: () => Boolean(process.env.BUILD_DEFINITIONNAME),
    branchName: () => process.env.BUILD_SOURCEBRANCHNAME,
    gitCommit: () => process.env.BUILD_SOURCEVERSION,
    pullRequestNumber: () => stringOrUndefinedToNumber(process.env.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER || process.env.SYSTEM_PULLREQUEST_PULLREQUESTID),
    repoUrl: () => process.env.BUILD_REPOSITORYURI,
});
//# sourceMappingURL=azure-pipelines.js.map