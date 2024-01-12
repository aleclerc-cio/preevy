import { Logger } from './log.js';
import { MachineConnection } from './driver/index.js';
export declare const dockerEnvContext: ({ connection, log, env }: {
    connection: Pick<MachineConnection, 'dockerSocket'>;
    log: Logger;
    env?: Record<string, string | undefined> | undefined;
}) => Promise<AsyncDisposable & {
    env: Record<string, string>;
}>;
