import { spawn } from 'child_process';
import yaml from 'yaml';
import { hasPropertyDefined } from '@preevy/common';
import { childProcessPromise, childProcessStdoutPromise, ProcessError } from '../child-process.js';
const DOCKER_COMPOSE_NO_CONFIGURATION_FILE_ERROR_CODE = 14;
class LoadComposeFileError extends Error {
    constructor(cause) {
        const causeMessage = cause instanceof Error ? cause.message : String(cause);
        super(`Could not load compose file: ${causeMessage}`);
        this.cause = cause;
    }
}
export class NoComposeFilesError extends LoadComposeFileError {
    constructor() {
        super('No compose files found');
    }
}
class DockerIsNotInstalled extends Error {
    constructor(cause) {
        super(`Failed to run 'docker compose', is Docker installed with the Compose plugin? (${cause.message})`);
        this.cause = cause;
    }
}
const isExposedService = (x) => hasPropertyDefined(x[1], 'ports');
const getExposedServices = (model) => Object.entries(model.services ?? []).filter(isExposedService);
export const getExposedTcpServicePorts = (model) => getExposedServices(model)
    .map(([name, { ports }]) => ({
    name,
    ports: ports
        .filter(({ protocol }) => protocol === 'tcp')
        .map(({ target }) => target),
}));
const composeFileArgs = ({ composeFiles, projectName, projectDirectory }) => [
    ...(projectName ? ['-p', projectName] : []),
    ...(projectDirectory ? ['--project-directory', projectDirectory] : []),
    ...(Buffer.isBuffer(composeFiles) ? ['-f', '-'] : composeFiles.flatMap(file => ['-f', file])),
];
const composeClient = (executer, composeFiles) => {
    const execComposeCommand = async (args) => await executer({
        args,
        stdin: Buffer.isBuffer(composeFiles) ? composeFiles : undefined,
    }).catch(e => {
        if (e.code === 'ENOENT') {
            throw new DockerIsNotInstalled(e);
        }
        throw e;
    });
    const getModel = async (services = []) => yaml.parse(await execComposeCommand(['convert', ...services]));
    return {
        getModel,
        getModelOrError: async (services = []) => await getModel(services).catch(e => {
            if (e instanceof DockerIsNotInstalled
                || (e instanceof ProcessError && (e.code === DOCKER_COMPOSE_NO_CONFIGURATION_FILE_ERROR_CODE))) {
                return new LoadComposeFileError(e);
            }
            throw e;
        }),
        getModelName: async () => (await getModel()).name,
        getServiceLogs: (service) => execComposeCommand(['logs', '--no-color', '--no-log-prefix', service]),
        getServiceUrl: (service, port) => execComposeCommand(['port', service, String(port)]),
    };
};
export const localComposeClient = ({ composeFiles, projectName, env, projectDirectory }) => {
    const insertStdin = (stdio) => {
        if (!Buffer.isBuffer(composeFiles)) {
            return stdio;
        }
        if (Array.isArray(stdio)) {
            return [null, ...stdio.slice(1)];
        }
        if (typeof stdio === 'string') {
            return [null, stdio, stdio];
        }
        return [null, null, null];
    };
    const fileArgs = composeFileArgs({ composeFiles, projectName, projectDirectory });
    const spawnComposeArgs = (...[args, opts]) => [
        'docker',
        [
            'compose',
            ...fileArgs,
            ...args,
        ],
        {
            ...opts,
            env: {
                ...process.env,
                ...env,
                ...opts.env,
            },
            stdio: insertStdin(opts.stdio),
        },
    ];
    const addStdIn = (p) => {
        if (Buffer.isBuffer(composeFiles)) {
            const stdin = p.stdin;
            stdin.write(composeFiles);
            stdin.end();
        }
        return p;
    };
    const spawnCompose = (...args) => addStdIn(spawn(...spawnComposeArgs(...args)));
    const spawnComposePromise = async (...args) => await childProcessPromise(spawnCompose(...args));
    const executer = async ({ args }) => await childProcessStdoutPromise(spawnCompose(args, {}));
    return Object.assign(composeClient(executer, composeFiles), {
        getServiceLogsProcess: (service, opts = {}) => spawnCompose(['logs', '--no-color', '--no-log-prefix', '--follow', service], opts),
        spawn: spawnCompose,
        spawnPromise: spawnComposePromise,
    });
};
//# sourceMappingURL=client.js.map