import { ComposeModel } from '../compose/index.js';
import { Logger } from '../log.js';
import { BuildSpec } from '../build/index.js';
import { ImageTagCalculator } from '../build/image-tag.js';
declare const buildCommand: ({ log, composeModel, projectLocalDataDir, cwd, buildSpec, machineDockerPlatform, env, imageTagCalculator, }: {
    log: Logger;
    composeModel: ComposeModel;
    projectLocalDataDir: string;
    cwd: string;
    buildSpec: BuildSpec;
    machineDockerPlatform: string;
    env?: Record<string, string> | undefined;
    imageTagCalculator: ImageTagCalculator;
}) => Promise<{
    buildModel: ComposeModel;
    deployModel: ComposeModel;
}>;
export default buildCommand;
