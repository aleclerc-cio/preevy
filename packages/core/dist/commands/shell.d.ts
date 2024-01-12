import { MachineDriver } from '../driver/index.js';
import { Logger } from '../log.js';
declare const shell: ({ envId, args, machineDriver, }: {
    envId: string;
    args: string[];
    machineDriver: MachineDriver;
    log: Logger;
}) => Promise<{
    code: number;
} | {
    signal: string;
}>;
export default shell;
