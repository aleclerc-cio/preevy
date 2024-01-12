import { detectCiProvider } from './ci-providers/index.js';
import { gitContext } from './git.js';
export const normalize = (s) => s
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/^[^a-z]/, firstChar => `a${firstChar}`); // prepend alpha char if first char is not alpha
const envIdFromBranch = (branch) => normalize(branch);
export class AmbientEnvIdNotFoundError extends Error {
    constructor() {
        super('Cannot find an ambient environment ID. Either specify an environment ID with the --id flag or run in a git repo with at least one commit');
    }
}
export class InvalidIdentifierError extends Error {
    constructor(value, fieldDescription) {
        super(`Invalid ${fieldDescription} "${value}". Must start with a lowercase letter. Can only contain lowercase letters, digits, underscores and dashes.`);
        this.value = value;
        this.fieldDescription = fieldDescription;
    }
}
const validateUserSpecifiedValue = ({ value, fieldDescription }) => {
    if (normalize(value) !== value) {
        throw new InvalidIdentifierError(value, fieldDescription);
    }
    return value;
};
export const validateEnvId = (envId) => validateUserSpecifiedValue({ value: envId, fieldDescription: 'environment ID' });
const findAmbientEnvIdSuffix = async () => {
    const ciProvider = detectCiProvider();
    if (ciProvider) {
        const branch = ciProvider.branchName();
        if (branch) {
            return { value: envIdFromBranch(branch), basedOn: 'CI branch' };
        }
    }
    const branch = await gitContext().branchName();
    if (branch) {
        return { value: envIdFromBranch(branch), basedOn: 'local git branch' };
    }
    throw new AmbientEnvIdNotFoundError();
};
const findAmbientEnvId = async (projectName) => {
    const { value: suffix, basedOn } = await findAmbientEnvIdSuffix();
    return {
        value: normalize([projectName, suffix].join('-')),
        basedOn,
    };
};
export const findProjectName = async ({ userSpecifiedProjectName, userModel }) => {
    if (userSpecifiedProjectName) {
        return { projectName: userSpecifiedProjectName };
    }
    return {
        projectName: (typeof userModel === 'function' ? await userModel() : userModel).name,
        projectNameBasedOn: 'Docker Compose',
    };
};
export const findEnvIdByProjectName = async ({ log, projectName, projectNameBasedOn }) => {
    const { value: envId, basedOn } = await findAmbientEnvId(projectName);
    const envIdBaseOn = [
        projectNameBasedOn ? `project name from ${projectNameBasedOn}` : 'user specified project name',
        basedOn,
    ].join(' and ');
    log.info(`Using environment ID ${envId}, based on ${envIdBaseOn}`);
    return envId;
};
export async function findEnvId({ log, userSpecifiedEnvId, userSpecifiedProjectName, userModel }) {
    if (userSpecifiedEnvId) {
        log.debug(`Using user specified environment ID ${userSpecifiedEnvId}`);
        return validateEnvId(userSpecifiedEnvId);
    }
    const { projectName, projectNameBasedOn } = userSpecifiedProjectName
        ? { projectName: userSpecifiedProjectName, projectNameBasedOn: undefined }
        : await findProjectName({ userSpecifiedProjectName, userModel });
    return await findEnvIdByProjectName({ log, projectName, projectNameBasedOn });
}
//# sourceMappingURL=env-id.js.map