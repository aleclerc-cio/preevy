import { isPromise } from 'util/types';
export const logFunc = (f, opts = {}) => (...args) => {
    // eslint-disable-next-line no-console
    const logger = opts?.log || console.log;
    const name = opts?.name || f.name;
    const log = (details) => logger(`function call: ${name}`, { args, ...details });
    try {
        const r = f(...args);
        if (isPromise(r)) {
            return r.then(r2 => {
                log({ result: r2 });
                return r2;
            }, e => {
                log({ exception: e });
                throw e;
            });
        }
        log({ result: r });
        return r;
    }
    catch (e) {
        log({ exception: e });
        throw e;
    }
};
//# sourceMappingURL=func-log.js.map