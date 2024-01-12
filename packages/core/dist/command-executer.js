import shellEscape from 'shell-escape';
import { inspect } from 'util';
export const execResultFromOrderedOutput = (oo, encoding = 'utf-8') => ({
    get stdout() {
        return oo.stdout().toString(encoding);
    },
    get stderr() {
        return oo.stderr().toString(encoding);
    },
    get output() {
        return oo.output().toString(encoding);
    },
});
export class CommandError extends Error {
    constructor(command, field, value, message) {
        super(`Error ${field} ${inspect(value)} from command ${command}: ${message}`);
        this.command = command;
    }
}
export const checkResult = (command, result) => {
    if ('code' in result && result.code !== 0) {
        throw new CommandError(command, 'code', result.code, result.output);
    }
    if ('signal' in result) {
        throw new CommandError(command, 'signal', result.signal, result.output);
    }
    return result;
};
const commandWithEnv = (command, env) => [
    ...Object.entries(env ?? {}).map(([key, val]) => `export ${shellEscape([key])}=${shellEscape([val ?? ''])}`),
    command,
].join('; ');
const commandWithCd = (command, cwd) => (cwd ? `cd ${shellEscape([cwd])}; ${command}` : command);
const commandWithAsRoot = (command, asRoot) => (asRoot ? `su - <<'sueof'\n${command}\nsueof` : command);
export const commandWith = (command, { env, cwd, asRoot }) => commandWithAsRoot(commandWithEnv(commandWithCd(command, cwd), env), asRoot);
export const mkdir = (exec) => (...dirs) => exec(dirs.map(dir => `mkdir -p ${shellEscape([dir])}`).join(' && '));
//# sourceMappingURL=command-executer.js.map