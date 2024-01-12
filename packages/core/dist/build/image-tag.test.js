import { beforeEach, describe, it, expect } from '@jest/globals';
import { mockFunction } from '../test-helpers.js';
import { imageTagCalculator } from './image-tag.js';
describe('imageTagCalculator', () => {
    const dockerfileContents = 'FROM my-image';
    let mockReader;
    beforeEach(() => {
        mockReader = { read: mockFunction() };
    });
    let mockGitContextCreator;
    let mockGitContext;
    beforeEach(() => {
        mockGitContext = {
            commit: mockFunction(async () => 'abcdef'),
            localChanges: mockFunction(async () => ''),
        };
        mockGitContextCreator = mockFunction(() => mockGitContext);
    });
    describe('sanity', () => {
        let c;
        let tag;
        beforeEach(async () => {
            c = imageTagCalculator({
                gitContext: mockGitContextCreator,
                fsReader: mockReader,
            });
            tag = await c({
                context: '/context',
                dockerfile: 'Dockerfile',
            });
        });
        it('should call the commit function correctly', async () => {
            expect(mockGitContext.commit).toHaveBeenCalledWith({ short: true });
        });
        it('should generate a tag', async () => {
            expect(tag).toMatch(/^[a-z0-9-]+$/);
        });
        it('should generate the same tag for the same build', async () => {
            expect(await c({
                context: '/context',
                dockerfile: 'Dockerfile',
            })).toEqual(tag);
        });
        it('should generate the same tag if the dockerfile path changed', async () => {
            expect(await c({
                context: '/context',
                dockerfile: 'Dockerfile.a',
            })).toEqual(tag);
        });
        it('should generate a different tag if the context changed', async () => {
            expect(await c({
                context: '/context/a',
                dockerfile: 'Dockerfile',
            })).not.toEqual(tag);
        });
        it('should generate a different tag if the dockerfile contents changed', async () => {
            mockReader.read.mockResolvedValue(Buffer.from(`${dockerfileContents}a`));
            expect(await c({
                context: '/context/a',
                dockerfile: 'Dockerfile',
            })).not.toEqual(tag);
        });
        it('should generate a different tag if the build args changed', async () => {
            expect(await c({
                context: '/context/a',
                dockerfile: 'Dockerfile',
                args: { foo: 'bar' },
            })).not.toEqual(tag);
        });
        it('should generate a different tag if the build target changed', async () => {
            expect(await c({
                context: '/context/a',
                dockerfile: 'Dockerfile',
                target: 'dev',
            })).not.toEqual(tag);
        });
    });
});
//# sourceMappingURL=image-tag.test.js.map