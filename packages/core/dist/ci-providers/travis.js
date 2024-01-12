import { nanToUndefined } from './common.js';
// https://docs.travis-ci.com/user/environment-variables/#default-environment-variables
export const travisCiProvider = () => ({
    name: 'Travis CI',
    id: 'travis',
    currentlyRunningInProvider: () => Boolean(process.env.CI && process.env.TRAVIS),
    branchName: () => (process.env.TRAVIS_TAG ? undefined : process.env.TRAVIS_BRANCH),
    gitCommit: () => process.env.TRAVIS_COMMIT,
    pullRequestNumber: () => (process.env.TRAVIS_PULL_REQUEST && process.env.TRAVIS_PULL_REQUEST !== 'false'
        ? nanToUndefined(Number(process.env.TRAVIS_PULL_REQUEST))
        : undefined),
    repoUrl: () => undefined,
});
//# sourceMappingURL=travis.js.map