import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { rimraf } from 'rimraf';
import { inspect } from 'util';
import retry from 'p-retry';
import { connectSshClient } from '../ssh/index.js';
import { sshKeysStore } from '../state/index.js';
const isSshMachine = (m) => 'sshKeyName' in m;
const ensureSshMachine = (m) => {
    if (!isSshMachine(m)) {
        throw new Error(`Machine ${m.providerId} is not a SshMachine: ${inspect(m)}`);
    }
    return m;
};
export const sshDriver = ({ getSshKey }) => {
    const getPrivateKey = async (machine) => (await getSshKey(machine)).privateKey.toString('utf-8');
    return {
        connect: async (m, { log, debug, retryOpts = { retries: 0 } }) => {
            const machine = ensureSshMachine(m);
            const connection = await retry(async () => await connectSshClient({
                log,
                debug,
                host: machine.publicIPAddress,
                username: machine.sshUsername,
                privateKey: await getPrivateKey(machine),
            }), retryOpts);
            return {
                [Symbol.dispose]: () => connection[Symbol.dispose](),
                exec: connection.exec,
                dockerSocket: async () => {
                    const host = '0.0.0.0';
                    const forward = await connection.forwardOutStreamLocal({ port: 0, host }, '/var/run/docker.sock');
                    return {
                        [Symbol.asyncDispose]: forward[Symbol.asyncDispose],
                        address: { host, port: forward.localSocket.port },
                    };
                },
            };
        },
        spawnRemoteCommand: async (m, command, stdio) => {
            const machine = ensureSshMachine(m);
            const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'preevy-ssh-key-'));
            const privateKeyFilename = path.join(tempDir, machine.providerId);
            await fs.promises.writeFile(privateKeyFilename, await getPrivateKey(machine), { mode: 0o400, flag: 'w' });
            const sshArgs = [
                '-i', privateKeyFilename,
                `${machine.sshUsername}@${machine.publicIPAddress}`,
                ...command,
            ];
            const sshProcess = spawn('ssh', sshArgs, { stdio });
            sshProcess.on('exit', () => rimraf(tempDir));
            return await new Promise((resolve, reject) => {
                sshProcess.on('error', reject);
                sshProcess.on('exit', (code, signal) => resolve(code !== null ? { code } : { signal: signal }));
            });
        },
    };
};
export const getStoredKeyOrUndefined = (store, alias) => {
    const keyStore = sshKeysStore(store);
    return keyStore.readKey(alias);
};
export const getStoredKey = async (store, alias) => {
    const result = await getStoredKeyOrUndefined(store, alias);
    if (!result) {
        throw new Error(`Could not find SSH key for ${alias}`);
    }
    return result;
};
//# sourceMappingURL=ssh.js.map