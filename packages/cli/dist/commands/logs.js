import { __addDisposableResource, __disposeResources } from "tslib";
import yaml from 'yaml';
import { Args, Flags } from '@oclif/core';
import { addBaseComposeTunnelAgentService, localComposeClient, findEnvId, remoteUserModel, dockerEnvContext, } from '@preevy/core';
import { COMPOSE_TUNNEL_AGENT_SERVICE_NAME } from '@preevy/common';
import DriverCommand from '../driver-command.js';
import { envIdFlags } from '../common-flags.js';
const validateServices = (specifiedServices, userModel) => {
    // exclude compose tunnel agent service unless explicitly specified
    const modelServices = Object.keys(userModel.services ?? {});
    const services = specifiedServices.length ? specifiedServices : modelServices;
    for (const service of services) {
        if (service !== COMPOSE_TUNNEL_AGENT_SERVICE_NAME && !modelServices.includes(service)) {
            throw new Error(`Specified service ${service} not found. Available services: ${modelServices.join(', ')}`);
        }
    }
    return services;
};
const dockerComposeLogsFlags = {
    follow: Flags.boolean({
        description: 'Follow log output',
    }),
    tail: Flags.integer({
        description: 'Number of lines to show from the end of the logs for each container (default: all)',
    }),
    'no-log-prefix': Flags.boolean({
        description: 'Don\'t print log prefix in logs',
    }),
    timestamps: Flags.boolean({
        description: 'Show timestamps',
    }),
    since: Flags.string({
        description: 'Show logs since timestamp',
    }),
    until: Flags.string({
        description: 'Show logs before timestamp',
    }),
};
const serializeDockerComposeLogsFlags = (flags) => [
    ...flags.follow ? ['--follow'] : [],
    ...flags.tail ? ['--tail', flags.tail.toString()] : [],
    ...flags.until ? ['--until', flags.until] : [],
    ...flags.since ? ['--since', flags.since] : [],
    ...flags.timestamps ? ['--timestamps'] : [],
    ...flags['no-log-prefix'] ? ['--no-log-prefix'] : [],
];
// eslint-disable-next-line no-use-before-define
class Logs extends DriverCommand {
    async run() {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const log = this.logger;
            const { flags, rawArgs: restArgs } = this;
            let connection;
            let userModel;
            if (flags.id) {
                connection = await this.connect(flags.id);
                userModel = await remoteUserModel(connection);
            }
            else {
                userModel = await this.ensureUserModel();
                const envId = await findEnvId({
                    log,
                    userSpecifiedEnvId: undefined,
                    userSpecifiedProjectName: flags.project,
                    userModel,
                });
                connection = await this.connect(envId);
            }
            const compose = localComposeClient({
                composeFiles: Buffer.from(yaml.stringify(addBaseComposeTunnelAgentService(userModel))),
                projectName: flags.project,
                projectDirectory: process.cwd(),
            });
            const dockerContext = __addDisposableResource(env_1, await dockerEnvContext({ connection, log }), true);
            await compose.spawnPromise([
                'logs',
                ...serializeDockerComposeLogsFlags(flags),
                ...validateServices(restArgs, userModel),
            ], { stdio: 'inherit', env: dockerContext.env });
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            const result_1 = __disposeResources(env_1);
            if (result_1)
                await result_1;
        }
    }
}
Logs.description = 'Show logs for an existing environment';
Logs.flags = {
    ...envIdFlags,
    ...dockerComposeLogsFlags,
};
Logs.strict = false;
Logs.enableJsonFlag = false;
Logs.args = {
    services: Args.string({
        description: 'Service name(s). If not specified, will show all services',
    }),
};
export default Logs;
//# sourceMappingURL=logs.js.map