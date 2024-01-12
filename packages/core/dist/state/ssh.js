import path from 'path';
import { generateSshKeyPair } from '../ssh/keypair.js';
export const sshKeysStore = (store) => {
    const sshKeysDir = 'ssh-keys';
    const privateKeyFile = (name) => path.join(name, 'id_rsa');
    const publicKeyFile = (name) => path.join(name, 'id_rsa.pub');
    const ref = store.ref(sshKeysDir);
    const readKey = async (alias) => {
        const [privateKey, publicKey] = await Promise.all([
            ref.read(privateKeyFile(alias)),
            ref.read(publicKeyFile(alias)),
        ]);
        return privateKey && publicKey ? { alias, privateKey, publicKey } : undefined;
    };
    const writeKey = ({ alias, privateKey, publicKey }) => store.transaction(sshKeysDir, async ({ write }) => {
        await Promise.all([
            write(privateKeyFile(alias), privateKey),
            write(publicKeyFile(alias), publicKey),
        ]);
    });
    return {
        readKey,
        writeKey,
        upsertKey: async (alias, type = 'ed25519') => {
            let storedKeyPair = await readKey(alias);
            if (!storedKeyPair) {
                const newKeyPair = await generateSshKeyPair(type);
                storedKeyPair = { alias, ...newKeyPair };
                await writeKey(storedKeyPair);
            }
            return storedKeyPair.publicKey.toString('utf-8');
        },
        deleteKey: async (alias) => await store.transaction(sshKeysDir, async ({ delete: del }) => {
            await Promise.all([
                del(privateKeyFile(alias)),
                del(publicKeyFile(alias)),
            ]);
        }),
    };
};
//# sourceMappingURL=ssh.js.map