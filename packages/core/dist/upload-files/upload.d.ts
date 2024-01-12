import { FileToCopy } from './files.js';
import { StartStreamingResult } from './tar.js';
import { CommandExecuter } from '../command-executer.js';
type Totals = {
    files: number;
    bytes: number;
    skipped: number;
};
export declare const upload: (exec: CommandExecuter, remoteDir: string, filesToCopy: FileToCopy[], skipUnchangedFiles?: boolean, { onStart }?: {
    onStart?: ((finalizeResult: Omit<StartStreamingResult, 'totals'> & {
        totals: Promise<Totals>;
    }) => void) | undefined;
}) => Promise<{
    skipped: number;
}>;
export declare const uploadWithSpinner: (exec: CommandExecuter, remoteDir: string, filesToCopy: FileToCopy[], skipUnchangedFiles?: boolean) => Promise<void>;
export {};
