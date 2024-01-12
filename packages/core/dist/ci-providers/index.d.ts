import { CiProvider } from './base.js';
export declare const ciProviders: {
    githubActions: CiProvider;
    gitlabActions: CiProvider;
    travis: CiProvider;
    circle: CiProvider;
    azurePipelines: CiProvider;
};
export declare const detectCiProvider: () => CiProvider | undefined;
export { CiProvider } from './base.js';
