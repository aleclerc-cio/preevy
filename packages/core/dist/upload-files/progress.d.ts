import { SimpleEmitter, StateEmitter, StateEmitterConsumer, EmitterConsumer } from '@preevy/common';
export type TransferProgressEvents = {
    bytes: {
        bytes: number;
        file: string;
    };
    file: string;
};
export type TransferProgressEmitter = SimpleEmitter<TransferProgressEvents>;
export declare const transferProgressEmitter: () => TransferProgressEmitter;
export type ExpandedTransferProgress = {
    bytes: number;
    files: number;
    bytesPerSec: number;
    currentFile: string | undefined;
};
export declare const expandedTransferProgressEmitter: (s: EmitterConsumer<TransferProgressEvents>) => StateEmitter<ExpandedTransferProgress>;
export type ExpandedProgressConsumer = StateEmitterConsumer<ExpandedTransferProgress> & {
    done: Promise<void>;
};
