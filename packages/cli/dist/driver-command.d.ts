import { Command, Interfaces } from '@oclif/core';
import { MachineConnection, MachineDriver } from '@preevy/core';
import { DriverFlags, DriverName, FlagType } from './drivers.js';
import ProfileCommand from './profile-command.js';
export type Flags<T extends typeof Command> = Interfaces.InferredFlags<typeof DriverCommand['baseFlags'] & T['flags']>;
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>;
declare abstract class DriverCommand<T extends typeof Command> extends ProfileCommand<T> {
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
    init(): Promise<void>;
    get driverName(): DriverName;
    protected driverFlags<Name extends DriverName, Type extends FlagType>(driver: Name, type: Type): Promise<DriverFlags<DriverName, Type>>;
    driver(): Promise<MachineDriver>;
    withConnection<RT>(envId: string, f: (connection: MachineConnection) => Promise<RT>): Promise<RT>;
    connect(envId: string): Promise<MachineConnection>;
}
export default DriverCommand;
