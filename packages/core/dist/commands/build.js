import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { spawn } from 'child_process';
import { generateBuild } from '../build/index.js';
import { childProcessPromise } from '../child-process.js';
import { telemetryEmitter } from '../telemetry/index.js';
import { measureTime } from '../timing.js';
const buildCommand = async ({ log, composeModel, projectLocalDataDir, cwd, buildSpec, machineDockerPlatform, env, imageTagCalculator, }) => {
    const { buildModel, createBakeArgs, deployModel } = await generateBuild({
        composeModel,
        buildSpec,
        machineDockerPlatform,
        imageTagCalculator,
    });
    const modelStr = yaml.stringify(buildModel);
    log.debug('build model', modelStr);
    const modelFilename = path.join(projectLocalDataDir, 'docker-compose.build.yaml');
    await fs.promises.writeFile(modelFilename, modelStr, 'utf-8');
    const dockerArgs = [
        ...['buildx', 'bake'],
        ...createBakeArgs(modelFilename),
    ];
    log.info(`Running: docker ${dockerArgs.join(' ')}`);
    const { elapsedTimeSec } = await measureTime(() => childProcessPromise(spawn('docker', dockerArgs, { stdio: 'inherit', cwd, env })));
    telemetryEmitter().capture('build success', {
        elapsed_sec: elapsedTimeSec,
        has_registry: Boolean(buildSpec.registry),
    });
    log.info(`Build step done in ${elapsedTimeSec.toLocaleString(undefined, { maximumFractionDigits: 2 })}s`);
    return { buildModel, deployModel };
};
export default buildCommand;
//# sourceMappingURL=build.js.map