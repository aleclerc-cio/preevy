var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import yaml from 'yaml';
import { composeModelFilename, localComposeClient } from '../compose/index.js';
import { dockerEnvContext } from '../docker.js';
import { remoteProjectDir } from '../remote-files.js';
import { uploadWithSpinner } from '../upload-files/index.js';
import modelCommand from './model.js';
import buildCommand from './build.js';
import { telemetryEmitter } from '../telemetry/index.js';
import { measureTime } from '../timing.js';
import { imageTagCalculator } from '../build/image-tag.js';
import { gitContext } from '../git.js';
import { localFs } from '../index.js';
const uploadFiles = async ({ log, filesToCopy, exec, skipUnchangedFiles, remoteDir, }) => {
    await exec(`mkdir -p "${remoteDir}"`);
    log.debug('Files to copy', filesToCopy);
    await uploadWithSpinner(exec, remoteDir, filesToCopy, skipUnchangedFiles);
};
const up = async ({ debug, machineStatusCommand, userAndGroup, dockerPlatform, connection, tunnelOpts, userSpecifiedProjectName, userSpecifiedServices, volumeSkipList, scriptInjections, composeFiles, log, dataDir, allowedSshHostKeys, sshTunnelPrivateKey, cwd, skipUnchangedFiles, version, envId, expectedServiceUrls, projectName, buildSpec, modelFilter, }) => {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
        const remoteDir = remoteProjectDir(projectName);
        const { model, filesToCopy, skippedVolumes, projectLocalDataDir, createCopiedFile, } = await modelCommand({
            debug,
            log,
            machineStatusCommand,
            userAndGroup,
            cwd,
            tunnelOpts,
            userSpecifiedProjectName,
            userSpecifiedServices,
            volumeSkipList,
            scriptInjections,
            version,
            envId,
            allowedSshHostKeys,
            composeFiles,
            dataDir,
            expectedServiceUrls,
            projectName,
            sshTunnelPrivateKey,
            modelFilter,
        });
        log.debug('build spec: %j', buildSpec ?? 'none');
        let composeModel = model;
        if (buildSpec) {
            const env_2 = { stack: [], error: void 0, hasError: false };
            try {
                const dockerContext = __addDisposableResource(env_2, await dockerEnvContext({ connection, log }), true);
                composeModel = (await buildCommand({
                    log,
                    buildSpec,
                    cwd,
                    composeModel,
                    projectLocalDataDir,
                    machineDockerPlatform: dockerPlatform,
                    env: dockerContext.env,
                    imageTagCalculator: imageTagCalculator({
                        gitContext,
                        fsReader: localFs('/'),
                    }),
                })).deployModel;
            }
            catch (e_1) {
                env_2.error = e_1;
                env_2.hasError = true;
            }
            finally {
                const result_1 = __disposeResources(env_2);
                if (result_1)
                    await result_1;
            }
        }
        skippedVolumes.forEach(({ service, source, matchingRule }) => {
            log.info(`Not copying volume "${source}" for service "${service}" because it matched skip glob "${matchingRule}"`);
        });
        const modelStr = yaml.stringify(composeModel);
        log.debug('model', modelStr);
        const composeFilePath = await createCopiedFile(composeModelFilename, modelStr);
        filesToCopy.push(composeFilePath);
        await uploadFiles({ log, filesToCopy, exec: connection.exec, skipUnchangedFiles, remoteDir });
        const compose = localComposeClient({
            composeFiles: [composeFilePath.local],
            projectDirectory: cwd,
        });
        const composeArgs = [
            ...debug ? ['--verbose'] : [],
            'up', '-d', '--remove-orphans', '--party'
        ];
        log.info(`Running: docker compose up ${composeArgs.join(' ')}`);
        const dockerContext = __addDisposableResource(env_1, await dockerEnvContext({ connection, log }), true);
        const { elapsedTimeSec } = await measureTime(() => compose.spawnPromise(composeArgs, { stdio: 'inherit', env: dockerContext.env }));
        telemetryEmitter().capture('deploy success', {
            elapsed_sec: elapsedTimeSec,
            with_build: Boolean(buildSpec),
            has_registry: Boolean(buildSpec?.registry),
        });
        log.info(`Deploy step done in ${elapsedTimeSec.toLocaleString(undefined, { maximumFractionDigits: 2 })}s`);
        return { composeModel, projectLocalDataDir };
    }
    catch (e_2) {
        env_1.error = e_2;
        env_1.hasError = true;
    }
    finally {
        const result_2 = __disposeResources(env_1);
        if (result_2)
            await result_2;
    }
};
export default up;
//# sourceMappingURL=up.js.map