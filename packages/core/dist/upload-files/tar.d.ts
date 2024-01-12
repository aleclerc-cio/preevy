/// <reference types="node" resolution-mode="require"/>
import { Writable } from 'stream';
import { EmitterConsumer } from '@preevy/common';
import { TransferProgressEvents } from './progress.js';
import { FileInfo, FileToCopy } from './files.js';
export declare const tarStreamer: (initialFilesToCopy?: FileToCopy[]) => {
    add: (fileToCopy: FileToCopy) => void;
    startStreaming: ({ out, concurrency, filter }: {
        out: Writable;
        concurrency: number;
        filter?: ((fi: FileInfo, remote: string) => string | undefined) | undefined;
    }) => {
        done: Promise<void>;
        emitter: EmitterConsumer<TransferProgressEvents>;
        totals: Promise<{
            files: number;
            bytes: number;
        }>;
    };
};
export type StartStreamingResult = Awaited<ReturnType<ReturnType<typeof tarStreamer>['startStreaming']>>;
