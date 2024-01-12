import { SimpleEmitter } from '@preevy/common';
export type TransferProgressEvents = {
    bytes: {
        bytes: number;
        file: string;
    };
    file: string;
};
export type TransferProgressEmitter = SimpleEmitter<TransferProgressEvents>;
export declare const transferProgressEmitter: () => TransferProgressEmitter;
