import { nullTelemetryEmitter } from './emitter.js';
let staticEmitter = nullTelemetryEmitter;
export const registerEmitter = (emitter) => { staticEmitter = emitter; };
export const telemetryEmitter = () => staticEmitter;
export { telemetryEmitter as createTelemetryEmitter, nullTelemetryEmitter } from './emitter.js';
export { wireProcessExit } from './process-exit.js';
export { memoizedMachineId as machineId } from './machine-id.js';
//# sourceMappingURL=index.js.map