import { tryParseUrl } from '../url.js';
export const nanToUndefined = (value) => (Number.isNaN(value) ? undefined : value);
export const stringOrUndefinedToNumber = (value) => (value === undefined ? undefined : nanToUndefined(Number(value)));
export const extractPrNumberFromUrlPath = (s) => {
    if (!s) {
        return undefined;
    }
    const url = tryParseUrl(s);
    if (!url) {
        return undefined;
    }
    return stringOrUndefinedToNumber(url.pathname.match(/\/(\d+)($|\/)/)?.[1]);
};
//# sourceMappingURL=common.js.map