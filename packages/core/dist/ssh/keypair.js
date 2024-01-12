import crypto from 'crypto';
import { promisify } from 'util';
import sshpkModule from 'sshpk';
const { parseKey, parsePrivateKey } = sshpkModule;
const gen = promisify(crypto.generateKeyPair);
const genRsa = () => gen('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});
const genEd25519 = () => gen('ed25519', {
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});
export const generateSshKeyPair = async (type) => {
    const { privateKey, publicKey } = await (type === 'rsa' ? genRsa() : genEd25519());
    return {
        privateKey: parsePrivateKey(privateKey).toString('ssh-private'),
        publicKey: parseKey(publicKey).toString('ssh'),
    };
};
//# sourceMappingURL=keypair.js.map