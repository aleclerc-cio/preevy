import { extractPrNumberFromUrlPath, stringOrUndefinedToNumber } from './common.js';
// https://circleci.com/docs/variables/#built-in-environment-variables
export const circleCiProvider = () => ({
    name: 'CircleCI',
    id: 'circle',
    currentlyRunningInProvider: () => Boolean(process.env.CI === 'true' && process.env.CIRCLECI === 'true'),
    branchName: () => process.env.CIRCLE_BRANCH,
    gitCommit: () => process.env.CIRCLE_SHA1,
    pullRequestNumber: () => stringOrUndefinedToNumber(process.env.CIRCLE_PR_NUMBER)
        || extractPrNumberFromUrlPath(process.env.CIRCLE_PULL_REQUEST),
    repoUrl: () => process.env.CIRCLE_REPOSITORY_URL,
});
//# sourceMappingURL=circle.js.map