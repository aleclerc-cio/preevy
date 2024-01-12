import { isPartialMachine } from '../driver/index.js';
const shell = async ({ envId, args, machineDriver, }) => {
    const machine = await machineDriver.getMachine({ envId });
    if (!machine || isPartialMachine(machine)) {
        throw new Error(`Machine ${envId} not found`);
    }
    return await machineDriver.spawnRemoteCommand(machine, args, 'inherit');
};
export default shell;
//# sourceMappingURL=shell.js.map