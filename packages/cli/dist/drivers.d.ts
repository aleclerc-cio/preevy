/// <reference types="lodash" resolution-mode="require"/>
import { Flag } from '@oclif/core/lib/interfaces';
import { Interfaces } from '@oclif/core';
export declare const machineDrivers: {
    readonly lightsail: {
        readonly flags: {
            readonly region: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        };
        readonly factory: import("@preevy/core").MachineDriverFactory<{
            readonly region: string;
        }, import("@preevy/core").SshMachine, "machine" | "snapshot" | "keypair">;
        readonly machineCreationFlags: {
            'availability-zone': Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
            'bundle-id': Interfaces.OptionFlag<"nano_2_0" | "micro_2_0" | "small_2_0" | "medium_2_0" | "large_2_0" | "xlarge_2_0" | "2xlarge_2_0" | undefined, Interfaces.CustomOptions>;
            region: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        };
        readonly machineCreationFactory: import("@preevy/core").MachineCreationDriverFactory<{
            'availability-zone': string | undefined;
            'bundle-id': "nano_2_0" | "micro_2_0" | "small_2_0" | "medium_2_0" | "large_2_0" | "xlarge_2_0" | "2xlarge_2_0" | undefined;
            region: string;
        } & {
            json: boolean | undefined;
        }, import("@preevy/core").SshMachine>;
        readonly inquireFlags: () => Promise<{
            region: string;
        }>;
    };
    readonly gce: {
        readonly flags: {
            readonly 'project-id': Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
            readonly zone: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        };
        readonly factory: import("@preevy/core").MachineDriverFactory<{
            readonly 'project-id': string;
            readonly zone: string;
        } & {
            json: boolean | undefined;
        }, import("@preevy/core").SshMachine, "machine">;
        readonly machineCreationFlags: {
            readonly 'machine-type': Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
            readonly 'project-id': Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
            readonly zone: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        };
        readonly machineCreationFactory: import("@preevy/core").MachineCreationDriverFactory<{
            readonly 'machine-type': string | undefined;
            readonly 'project-id': string;
            readonly zone: string;
        } & {
            json: boolean | undefined;
        }, import("@preevy/core").SshMachine>;
        readonly inquireFlags: () => Promise<{
            'project-id': string;
            zone: string;
        }>;
    };
    readonly azure: {
        readonly flags: {
            readonly region: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
            readonly 'subscription-id': Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        };
        readonly factory: import("@preevy/core").MachineDriverFactory<{
            readonly region: string;
            readonly 'subscription-id': string;
        } & {
            json: boolean | undefined;
        }, import("@preevy/core").SshMachine, "machine">;
        readonly machineCreationFlags: {
            readonly 'vm-size': Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
            readonly region: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
            readonly 'subscription-id': Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        };
        readonly machineCreationFactory: import("@preevy/core").MachineCreationDriverFactory<{
            readonly region: string;
            readonly 'subscription-id': string;
            readonly 'vm-size': string;
        }, import("@preevy/core").SshMachine>;
        readonly inquireFlags: () => Promise<{
            region: string;
            'subscription-id': string;
        }>;
    };
    readonly 'kube-pod': {
        readonly flags: {
            readonly namespace: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
            readonly kubeconfig: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
            readonly context: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
            readonly template: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        };
        readonly factory: import("@preevy/core").MachineDriverFactory<{
            readonly namespace: string;
            readonly context: string | undefined;
            readonly template: string | undefined;
            readonly kubeconfig: string | undefined;
        }, import("@preevy/driver-kube-pod").DeploymentMachine, "machine">;
        readonly machineCreationFlags: {
            readonly 'server-side-apply': Interfaces.BooleanFlag<boolean>;
            readonly namespace: Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
            readonly kubeconfig: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
            readonly context: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
            readonly template: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        };
        readonly machineCreationFactory: import("@preevy/core").MachineCreationDriverFactory<{
            readonly 'server-side-apply': boolean;
            readonly namespace: string;
            readonly kubeconfig: string | undefined;
            readonly context: string | undefined;
            readonly template: string | undefined;
        } & {
            json: boolean | undefined;
        }, import("@preevy/driver-kube-pod").DeploymentMachine>;
        readonly inquireFlags: () => Promise<Partial<import("@preevy/driver-kube-pod").MachineCreationFlagTypes>>;
    };
};
type MachineDrivers = typeof machineDrivers;
export type DriverName = keyof MachineDrivers;
export type FlagType = 'flags' | 'machineCreationFlags';
export type DriverFlagName<Name extends DriverName, Type extends FlagType> = keyof MachineDrivers[Name][Type] extends string ? keyof MachineDrivers[Name][Type] : never;
export type DriverFlag<Name extends DriverName, Type extends FlagType, FlagName extends DriverFlagName<Name, Type>> = MachineDrivers[Name][Type][FlagName];
export type DriverFlags<Name extends DriverName, Type extends FlagType> = {
    [P in DriverFlagName<Name, Type> as `${Name}-${P}`]: DriverFlag<Name, Type, P>;
};
export declare const driverFlags: <Name extends "lightsail" | "gce" | "azure" | "kube-pod">(driverName: Name) => DriverFlags<Name, FlagType>;
export declare const machineCreationDriverFlags: <Name extends "lightsail" | "gce" | "azure" | "kube-pod">(driverName: Name) => DriverFlags<Name, FlagType>;
export declare const flagsForAllDrivers: {
    "kube-pod-namespace": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "kube-pod-kubeconfig": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    "kube-pod-context": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    "kube-pod-template": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    "azure-region": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "azure-subscription-id": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "gce-project-id": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "gce-zone": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "lightsail-region": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
};
export declare const machineCreationflagsForAllDrivers: {
    "kube-pod-namespace": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "kube-pod-kubeconfig": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    "kube-pod-context": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    "kube-pod-template": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
    "azure-region": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "azure-subscription-id": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "gce-project-id": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "gce-zone": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
    "lightsail-region": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
};
export declare const removeDriverFlagPrefix: (driverName: string, flag: string) => string;
export declare const removeDriverPrefix: <T extends {}>(driverName: string, flags: Record<string, unknown>) => import("lodash").Dictionary<unknown>;
export declare const addDriverPrefix: (driverName: string, flags: Record<string, unknown>) => import("lodash").Dictionary<unknown>;
export declare const formatDriverFlagsToArgs: (driverName: string, driverFlagDefs: Record<string, Flag<unknown>>, driverFlagValues: Record<string, unknown>) => string[];
type AllFlags = typeof flagsForAllDrivers & typeof machineCreationflagsForAllDrivers;
export declare function extractDriverFlags<TFlags extends Partial<AllFlags>>(flags: Interfaces.InferredFlags<TFlags>, driver: DriverName, options?: {
    excludeDefaultValues: boolean;
}): Record<string, unknown>;
export {};
