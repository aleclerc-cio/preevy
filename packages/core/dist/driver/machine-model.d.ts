export type Resource<Type extends string = string> = {
    providerId: string;
    type: Type;
};
export declare const machineResourceType: "machine";
export type MachineResourceType = typeof machineResourceType;
export type PartialMachine = Resource<MachineResourceType> & {
    error: string;
};
export type MachineBase = Resource<MachineResourceType> & {
    locationDescription: string;
    envId: string;
};
export type MachineResource = PartialMachine | MachineBase;
export declare const isPartialMachine: (m: MachineBase | PartialMachine) => m is PartialMachine;
export type SpecDiffItem = {
    name: string;
    old: string;
    new: string;
};
