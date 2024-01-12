/// <reference types="node" resolution-mode="require"/>
import { JWTPayload } from 'jose';
import ssh2 from 'ssh2';
import { Buffer } from 'buffer';
export declare const withBasicAuthCredentials: ({ user, password }: {
    user: string;
    password: string;
}, mode: 'browser' | 'api') => (url: string) => string;
export declare const parseKey: (key: string | Buffer) => ssh2.ParsedKey;
export declare const jwkThumbprint: (privateKey: string | Buffer) => Promise<string>;
export declare const jwkThumbprintUri: (privateKey: string | Buffer) => Promise<string>;
export declare const jwtGenerator: (privateKey: string | Buffer) => ({ claims, exp }?: {
    claims?: JWTPayload | undefined;
    exp?: string | undefined;
}) => Promise<string>;
export type JwtGenerator = ReturnType<typeof jwtGenerator>;
export declare const generateBasicAuthCredentials: (jwtGen: JwtGenerator) => Promise<{
    user: string;
    password: string;
}>;
