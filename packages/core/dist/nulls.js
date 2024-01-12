import { inspect } from 'util';
const isPromiseLike = (v) => v && typeof v.then === 'function';
export function ensureDefined(o, ...props) {
    const f = (obj) => {
        for (const prop of props) {
            if (obj[prop] === undefined || obj[prop] === null) {
                throw new Error(`${String(prop)} not found in ${inspect(obj)}`);
            }
        }
        return obj;
    };
    return isPromiseLike(o) ? o.then(f) : f(o);
}
export function extractDefined(o, prop) {
    const defined = ensureDefined(o, prop);
    return isPromiseLike(o)
        ? defined.then(obj => obj[prop])
        : o[prop];
}
export const hasProp = (prop) => (obj) => Boolean(obj[prop]);
//# sourceMappingURL=nulls.js.map