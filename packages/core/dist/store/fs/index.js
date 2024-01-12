export { localFs, localFsFromUrl } from './local.js';
export { jsonReader } from './json-reader.js';
export const fsTypeFromUrl = (url) => new URL(url).protocol.replace(':', '');
//# sourceMappingURL=index.js.map