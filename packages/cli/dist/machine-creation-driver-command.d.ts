import { Command, Interfaces } from '@oclif/core';
import { MachineCreationDriver } from '@preevy/core';
import DriverCommand from './driver-command.js';
export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof MachineCreationDriverCommand['baseFlags'] & T['flags']>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;
declare abstract class MachineCreationDriverCommand<T extends typeof Command> extends DriverCommand<T> {
    #private;
    static baseFlags: {
        "kube-pod-namespace": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        "kube-pod-kubeconfig": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        "kube-pod-context": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        "kube-pod-template": Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        "azure-region": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        "azure-subscription-id": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        "gce-project-id": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        "gce-zone": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        "lightsail-region": Interfaces.OptionFlag<string, Interfaces.CustomOptions>;
        driver: Interfaces.OptionFlag<"lightsail" | "gce" | "azure" | "kube-pod" | undefined, Interfaces.CustomOptions>;
        profile: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        'enable-plugin': Interfaces.OptionFlag<string[], Interfaces.CustomOptions>;
        'disable-plugin': Interfaces.OptionFlag<string[] | undefined, Interfaces.CustomOptions>;
        project: Interfaces.OptionFlag<string | undefined, Interfaces.CustomOptions>;
        file: Interfaces.OptionFlag<string[] | undefined, Interfaces.CustomOptions>;
        'system-compose-file': Interfaces.OptionFlag<string[] | undefined, Interfaces.CustomOptions>;
        'log-level': Interfaces.OptionFlag<"debug" | "info" | "warn" | "error" | undefined, Interfaces.CustomOptions>;
        debug: Interfaces.BooleanFlag<boolean>;
    };
    protected flags: Flags<T>;
    protected args: Args<T>;
    machineCreationDriver(): Promise<MachineCreationDriver>;
}
export default MachineCreationDriverCommand;
