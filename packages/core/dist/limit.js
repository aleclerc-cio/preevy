/* eslint-disable @typescript-eslint/no-explicit-any */
import originalPLimit from 'p-limit';
const noLimit = async (fn, ...args) => await fn(...args);
export const pLimit = (concurrency) => (concurrency > 0 ? originalPLimit(concurrency) : noLimit);
//# sourceMappingURL=limit.js.map