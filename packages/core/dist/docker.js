import { omitBy } from 'lodash-es';
import { withSpinner } from './spinner.js';
// export type FuncWrapper = <Return, Args extends unknown[] = []>(
//   f: (...args: Args) => Promise<Return>,
// ) => Promise<Return>
const dockerHost = (s) => (typeof s === 'string'
    ? `unix://${s}`
    : `tcp://${s.host}:${s.port}`);
export const dockerEnvContext = async ({ connection, log, env = process.env }) => {
    const { address, [Symbol.asyncDispose]: dispose } = await withSpinner(() => connection.dockerSocket(), { text: 'Connecting to remote docker socket...', successText: 'Connected to remote docker socket' });
    log.debug(`Local socket: ${JSON.stringify(address)}`);
    Object.keys(process.env).filter(k => k !== 'DOCKER_HOST' && k.startsWith('DOCKER_')).forEach(k => {
        log.warn(`deleting conflicting env var ${k}`);
        delete process.env[k];
    });
    return {
        env: {
            ...omitBy(env, (_, k) => k.startsWith('DOCKER_')),
            DOCKER_HOST: dockerHost(address),
        },
        [Symbol.asyncDispose]: dispose,
    };
};
// export const wrapWithDockerSocket = (
//   { connection, log }: {
//     connection: Pick<MachineConnection, 'dockerSocket'>
//     log: Logger
//   },
// ) => async <Return>(
//   f: (env: Record<string, string>) => Promise<Return>,
// ): Promise<Return> => {
//   const { address, close } = await withSpinner(
//     () => connection.dockerSocket(),
//     { text: 'Connecting to remote docker socket...', successText: 'Connected to remote docker socket' },
//   )
//   log.debug(`Local socket: ${JSON.stringify(address)}`)
//   Object.keys(process.env).filter(k => k !== 'DOCKER_HOST' && k.startsWith('DOCKER_')).forEach(k => {
//     log.warn(`deleting conflicting env var ${k}`)
//     delete process.env[k]
//   })
//   return await f({ DOCKER_HOST: dockerHost(address) }).finally(close)
// }
//# sourceMappingURL=docker.js.map