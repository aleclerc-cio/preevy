import { ComposeBuild } from '../compose/index.js';
import { GitContext } from '../git.js';
import { FsReader } from '../store/index.js';
export type ImageTagCalculator = (build: ComposeBuild) => Promise<string>;
export declare const imageTagCalculator: ({ gitContext, fsReader }: {
    gitContext: (dir: string) => Pick<GitContext, 'commit' | 'localChanges'>;
    fsReader: FsReader;
}) => (build: ComposeBuild) => Promise<string>;
