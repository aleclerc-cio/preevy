import { z } from 'zod';
import { VirtualFS } from './store/index.js';
import { Logger } from './log.js';
export declare class TokenExpiredError extends Error {
    constructor();
}
declare const tokensResponseDataSchema: z.ZodObject<{
    access_token: z.ZodString;
    id_token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    access_token: string;
    id_token: string;
}, {
    access_token: string;
    id_token: string;
}>;
export type TokenFileSchema = z.infer<typeof tokensResponseDataSchema>;
export declare const getTokensFromLocalFs: (fs: VirtualFS) => Promise<TokenFileSchema | undefined>;
export declare const login: (dataDir: string, loginUrl: string, lcUrl: string, clientId: string, logger: Logger) => Promise<void>;
export {};
