import { ComposeModel } from '../compose/index.js';
import { ImageTagCalculator } from './image-tag.js';
export type ImageRegistry = {
    registry: string;
    singleName?: string;
};
export type BuildSpec = {
    registry?: ImageRegistry;
    cacheFromRegistry?: boolean;
    noCache?: boolean;
    builder?: string;
};
export declare const parseRegistry: ({ registry, singleName }: {
    registry: string;
    singleName: undefined | string | false;
}) => ImageRegistry;
export declare const generateBuild: ({ composeModel, buildSpec, machineDockerPlatform, imageTagCalculator, }: {
    composeModel: ComposeModel;
    buildSpec: BuildSpec;
    machineDockerPlatform: string;
    imageTagCalculator: ImageTagCalculator;
}) => Promise<{
    buildModel: ComposeModel;
    createBakeArgs: (modelFilename: string) => string[];
    deployModel: ComposeModel;
}>;
