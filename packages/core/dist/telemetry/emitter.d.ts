import { TelemetryProperties } from './events.js';
export type GroupIdentityType = 'profile';
type IdentifyFunction = {
    (person: TelemetryProperties): void;
    (id: string, person?: TelemetryProperties): void;
};
export declare const telemetryEmitter: ({ dataDir, version, debug, filename }: {
    dataDir: string;
    version: string;
    debug: number;
    filename?: string | undefined;
}) => Promise<{
    identify: IdentifyFunction;
    group: ({ type: groupType, id: groupId }: {
        type: GroupIdentityType;
        id?: string;
    }, props?: TelemetryProperties) => void;
    capture: (event: string, props: TelemetryProperties) => void;
    setProps: (props: TelemetryProperties) => void;
    unref: () => void;
    flush(): Promise<void>;
}>;
export type TelemetryEmitter = Awaited<ReturnType<typeof telemetryEmitter>>;
export declare const nullTelemetryEmitter: TelemetryEmitter;
export {};
