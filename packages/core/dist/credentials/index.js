import { calculateJwkThumbprintUri, exportJWK, SignJWT, calculateJwkThumbprint } from 'jose';
import ssh2 from 'ssh2';
import { createPrivateKey } from 'crypto';
import memoize from 'p-memoize';
import { editUrl } from '@preevy/common';
const BASIC_AUTH_HINT_QUERY_PARAMS = {
    _preevy_auth_hint: 'basic',
};
export const withBasicAuthCredentials = ({ user, password }, mode) => (url) => editUrl(url, {
    username: user,
    password,
    queryParams: mode === 'browser' ? BASIC_AUTH_HINT_QUERY_PARAMS : {},
}).toString();
function getAsymmetricKeyAlg(key) {
    if (!key.asymmetricKeyType) {
        throw new Error('Only asymmetric keys are supported');
    }
    switch (key.asymmetricKeyType) {
        case 'rsa':
            return 'RS256';
        case 'ed25519':
            return 'EdDSA';
        default:
            throw new Error('Only RSA and Ed25519 keys are supported');
    }
}
export const parseKey = (key) => {
    const sshKey = ssh2.utils.parseKey(key);
    if (sshKey instanceof Error) {
        throw new Error('Could not parse private key', { cause: sshKey });
    }
    return sshKey;
};
const extractPrivateKeyObject = (privateSshKey) => createPrivateKey(parseKey(privateSshKey).getPrivatePEM());
export const jwkThumbprint = async (privateKey) => await calculateJwkThumbprint(await exportJWK(extractPrivateKeyObject(privateKey)), 'sha256');
export const jwkThumbprintUri = async (privateKey) => await calculateJwkThumbprintUri(await exportJWK(extractPrivateKeyObject(privateKey)), 'sha256');
export const jwtGenerator = (privateKey) => {
    const key = extractPrivateKeyObject(privateKey);
    const alg = getAsymmetricKeyAlg(key);
    const thumbprint = memoize(async () => await calculateJwkThumbprintUri(await exportJWK(key)));
    return async ({ claims = {}, exp = '60d' } = {}) => await (new SignJWT(claims).setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(`preevy://${await thumbprint()}`)
        .setExpirationTime(exp)
        .sign(key));
};
export const generateBasicAuthCredentials = async (jwtGen) => ({
    user: 'x-preevy-profile-key',
    password: await jwtGen(),
});
//# sourceMappingURL=index.js.map