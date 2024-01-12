/// <reference types="node" resolution-mode="require"/>
export declare const REMOTE_DIR_BASE = "/var/lib/preevy";
export declare const remoteProjectDir: (projectName: string) => string;
export declare const createCopiedFileInDataDir: ({ projectLocalDataDir }: {
    projectLocalDataDir: string;
}) => (filename: string, content: string | Buffer) => Promise<{
    local: string;
    remote: string;
}>;
