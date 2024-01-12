import { ComposeModel } from './compose/model.js';
import { Logger } from './log.js';
export type EnvId = string & {
    __tag: 'EnvId';
};
export declare const normalize: (s: string) => EnvId;
export declare class AmbientEnvIdNotFoundError extends Error {
    constructor();
}
export declare class InvalidIdentifierError extends Error {
    readonly value: string;
    readonly fieldDescription: string;
    constructor(value: string, fieldDescription: string);
}
export declare const validateEnvId: (envId: string) => EnvId;
export declare const findProjectName: ({ userSpecifiedProjectName, userModel }: {
    userSpecifiedProjectName: string | undefined;
    userModel: ComposeModel | (() => Promise<ComposeModel>);
}) => Promise<{
    projectName: string;
    projectNameBasedOn?: string;
}>;
export declare const findEnvIdByProjectName: ({ log, projectName, projectNameBasedOn }: {
    log: Logger;
    projectName: string;
    projectNameBasedOn?: string | undefined;
}) => Promise<EnvId>;
export declare function findEnvId({ log, userSpecifiedEnvId, userSpecifiedProjectName, userModel }: {
    log: Logger;
    userSpecifiedEnvId: string | undefined;
    userSpecifiedProjectName: string | undefined;
    userModel: ComposeModel | (() => Promise<ComposeModel>);
}): Promise<EnvId>;
