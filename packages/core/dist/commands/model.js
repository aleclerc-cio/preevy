import path from 'path';
import { rimraf } from 'rimraf';
import { remoteComposeModel } from '../compose/index.js';
import { createCopiedFileInDataDir } from '../remote-files.js';
const composeModel = async ({ debug, machineStatusCommand, userAndGroup, tunnelOpts, userSpecifiedProjectName, userSpecifiedServices, volumeSkipList, scriptInjections, composeFiles, log, dataDir, allowedSshHostKeys: hostKey, sshTunnelPrivateKey, cwd, version, envId, expectedServiceUrls, projectName, modelFilter, }) => {
    const projectLocalDataDir = path.join(dataDir, projectName);
    await rimraf(projectLocalDataDir);
    const createCopiedFile = createCopiedFileInDataDir({ projectLocalDataDir });
    const remoteModel = await remoteComposeModel({
        debug,
        userSpecifiedProjectName,
        userSpecifiedServices,
        volumeSkipList,
        composeFiles,
        log,
        cwd,
        expectedServiceUrls,
        projectName,
        modelFilter,
        agentSettings: {
            allowedSshHostKeys: hostKey,
            sshTunnelPrivateKey,
            userAndGroup,
            createCopiedFile,
            envId,
            tunnelOpts,
            version,
            machineStatusCommand,
            scriptInjections,
        },
    });
    return { ...remoteModel, projectLocalDataDir, createCopiedFile };
};
export default composeModel;
//# sourceMappingURL=model.js.map