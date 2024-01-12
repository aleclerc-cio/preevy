import { telemetryEmitter } from '@preevy/core';
const hook = async ({ Command: command, argv }) => {
    telemetryEmitter().capture('run', {
        command: command.name,
        argv,
    });
};
export default hook;
//# sourceMappingURL=telemetry.js.map