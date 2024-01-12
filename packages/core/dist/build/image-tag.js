import crypto from 'crypto';
import path from 'path';
import url from 'url';
import { memoize } from 'lodash-es';
import { tryParseUrl } from '../url.js';
import { randomString } from '../strings.js';
export const imageTagCalculator = ({ gitContext, fsReader }) => {
    const calcGitHash = async (dir) => {
        const gitCtx = gitContext(dir);
        const commitHash = await gitCtx.commit({ short: true });
        if (!commitHash) {
            return undefined;
        }
        const localChanges = await gitCtx.localChanges();
        return localChanges
            ? [commitHash, crypto.createHash('sha1').update(localChanges).digest('hex').substring(0, 8)].join('-')
            : commitHash;
    };
    const memoizedCalcGitHash = memoize(calcGitHash);
    const readDockerfileContents = async ({ context, ...build }) => {
        if ('dockerfile_inline' in build) {
            return build.dockerfile_inline;
        }
        const { dockerfile } = build;
        const contextUrl = tryParseUrl(context);
        if (!contextUrl) {
            return await fsReader.read(path.resolve(context, dockerfile));
        }
        if (contextUrl.protocol.startsWith('file:')) {
            return await fsReader.read(path.resolve(url.fileURLToPath(context), dockerfile));
        }
        return undefined; // TODO: attempt to fetch remote URL
    };
    return async (build) => {
        const contextGitHash = await memoizedCalcGitHash(build.context);
        if (!contextGitHash) {
            return randomString.lowercaseNumeric(8);
        }
        const hash = crypto.createHash('sha1').update(build.context).update(build.target ?? '');
        const dockerfileContents = await readDockerfileContents(build);
        hash.update(dockerfileContents ?? '');
        if (build.args) {
            hash.update(JSON.stringify(build.args));
        }
        return [contextGitHash, hash.digest().toString('hex').substring(0, 8)].join('-');
    };
};
//# sourceMappingURL=image-tag.js.map