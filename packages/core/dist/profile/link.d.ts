/// <reference types="node" resolution-mode="require"/>
import { Logger } from '../log.js';
export type Org = {
    id: string;
    name: string;
    role: string;
    slug: string;
};
export declare const link: ({ accessToken, lcUrl, logger, tunnelingKey, selectOrg, }: {
    accessToken: string;
    lcUrl: string;
    logger: Logger;
    tunnelingKey: Buffer;
    selectOrg: (orgs: Org[]) => Promise<Org>;
}) => Promise<void>;
