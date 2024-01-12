import ora from 'ora';
import { overrideGetterSetter } from './object.js';
export const spinner = (opts = {}) => {
    const fullText = (text) => {
        if (!text) {
            return opts.opPrefix ?? text;
        }
        return opts.opPrefix ? `${opts.opPrefix}: ${text}` : text;
    };
    const s = ora({ ...opts, text: fullText(opts.text) });
    return overrideGetterSetter(s, 'text', {
        setter: (text, originalSetter) => { originalSetter(fullText(text) ?? ''); },
    }, Object.getPrototypeOf(s));
};
export const withSpinner = async (fn, opts = {}) => {
    const s = spinner(opts);
    s.start();
    try {
        const result = await fn(s);
        const successText = opts?.successText && (typeof opts.successText === 'string'
            ? opts.successText
            : await opts.successText(result));
        s.succeed(successText);
        return result;
    }
    catch (e) {
        s.fail();
        throw e;
    }
};
//# sourceMappingURL=spinner.js.map