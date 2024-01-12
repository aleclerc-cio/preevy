import ProfileCommand from '../../profile-command.js';
export default class CreateProfile extends ProfileCommand<typeof CreateProfile> {
    static description: string;
    static flags: {
        driver: import("@oclif/core/lib/interfaces").OptionFlag<"lightsail" | "gce" | "azure" | "kube-pod" | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        use: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        "kube-pod-namespace": import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        "kube-pod-kubeconfig": import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        "kube-pod-context": import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        "kube-pod-template": import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        "azure-region": import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        "azure-subscription-id": import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        "gce-project-id": import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        "gce-zone": import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        "lightsail-region": import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static args: {
        name: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
        url: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    static strict: boolean;
    static enableJsonFlag: boolean;
    run(): Promise<unknown>;
}
