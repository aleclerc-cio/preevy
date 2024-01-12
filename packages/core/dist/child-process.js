import { orderedOutput } from '@preevy/common';
import childProcess from 'child_process';
import { Readable, Writable } from 'stream';
import { promisify } from 'util';
export const outputFromStdio = ({ stdout, stderr }) => {
    const buffers = [];
    stdout?.on('data', (data) => buffers.push({ stream: 'stdout', data }));
    stderr?.on('data', (data) => buffers.push({ stream: 'stderr', data }));
    return buffers;
};
export class ProcessError extends Error {
    constructor(process, code, signal, output) {
        super(ProcessError.calcMessage(process.spawnargs, code, signal, output));
        this.process = process;
        this.code = code;
        this.signal = signal;
        this.output = output;
    }
    static calcMessage(command, code, signal, output) {
        return [
            `command \`${command.join(' ')}\` exited with code ${code}${signal ? `and signal ${signal}` : ''}`,
            output ? orderedOutput(output).output().toString('utf-8') : undefined,
        ].filter(Boolean).join(': ');
    }
}
export function childProcessPromise(p, opts) {
    return new Promise((resolve, reject) => {
        const output = opts?.captureOutput ? outputFromStdio(p) : undefined;
        p.on('error', reject);
        p.on('exit', (code, signal) => {
            if (code !== 0) {
                reject(new ProcessError(p, code, signal, output));
                return;
            }
            resolve(Object.assign(p, { output }));
        });
    });
}
export const childProcessStdoutPromise = async (p) => {
    const { output } = await childProcessPromise(p, { captureOutput: true });
    return orderedOutput(output).stdout().toString('utf-8').trim();
};
export const spawnPromise = async (...args) => await childProcessPromise(childProcess.spawn(...args));
export const execPromise = promisify(childProcess.exec);
export const execPromiseStdout = async (command, opts) => (await execPromise(command, { cwd: opts?.cwd })).stdout.trim();
const expandStdio = (o, inherit, def) => {
    if (typeof o !== 'string') {
        return o;
    }
    if (o === 'inherit') {
        return inherit;
    }
    return def();
};
const devNullReadable = () => new Readable({ read: () => undefined });
const devNullWritable = () => new Writable({ write: (...[, , cb]) => { setImmediate(cb); } });
export const expandStdioOptions = (o) => {
    const oo = Array.isArray(o) ? o : [o, o, o];
    return {
        stdin: expandStdio(oo[0], process.stdin, devNullReadable),
        stdout: expandStdio(oo[1], process.stdout, devNullWritable),
        stderr: expandStdio(oo[2], process.stderr, devNullWritable),
    };
};
//# sourceMappingURL=child-process.js.map