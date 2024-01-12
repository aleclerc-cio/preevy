import ProfileCommand from '../../../profile-command.js';
export default class UpdateProfileConfig extends ProfileCommand<typeof UpdateProfileConfig> {
    static description: string;
    static flags: {
        driver: import("@oclif/core/lib/interfaces").OptionFlag<"lightsail" | "gce" | "azure" | "kube-pod" | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        unset: import("@oclif/core/lib/interfaces").OptionFlag<string[], import("@oclif/core/lib/interfaces").CustomOptions>;
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
    static strict: boolean;
    static enableJsonFlag: boolean;
    run(): Promise<void>;
}
