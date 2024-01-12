import { CommandExecuter, ExecResult } from './command-executer.js';
import { Logger } from './log.js';
export type RemoteScriptExecuter = (script: string, opts?: {
    env?: Record<string, string | undefined>;
}) => Promise<ExecResult>;
export declare const scriptExecuter: ({ exec, log }: {
    exec: CommandExecuter;
    log: Logger;
}) => RemoteScriptExecuter;
