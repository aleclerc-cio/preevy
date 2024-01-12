import { TelemetryEmitter } from './emitter.js';
export declare const registerEmitter: (emitter: TelemetryEmitter) => void;
export declare const telemetryEmitter: () => TelemetryEmitter;
export { telemetryEmitter as createTelemetryEmitter, nullTelemetryEmitter, TelemetryEmitter } from './emitter.js';
export { wireProcessExit } from './process-exit.js';
export { memoizedMachineId as machineId } from './machine-id.js';
