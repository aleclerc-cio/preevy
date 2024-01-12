import { parseKey } from '@preevy/common';
import crypto from 'crypto';
import { jwtGenerator } from '../credentials/index.js';
const keyTypeToArgs = {
    rsa: 'RS256',
    ed25519: 'EdDSA',
};
export const link = async ({ accessToken, lcUrl, logger, tunnelingKey, selectOrg, }) => {
    const orgsResponse = await fetch(`${lcUrl}/api/user/orgs`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } });
    if (!orgsResponse.ok)
        throw new Error(`Could not fetch orgs from Livecycle API. ${orgsResponse.status}: ${orgsResponse.statusText}`);
    const orgs = await orgsResponse.json();
    let chosenOrg;
    if (orgs.length === 0) {
        throw new Error("Couldn't find any organization for current logged in user");
    }
    else {
        chosenOrg = await selectOrg(orgs);
    }
    logger.info(`Linking to org "${chosenOrg.name}"`);
    const tokenGenerator = jwtGenerator(tunnelingKey);
    const parsed = parseKey(tunnelingKey);
    const prk = crypto.createPrivateKey({
        key: parsed.getPrivatePEM(),
    });
    const pk = crypto.createPublicKey(prk);
    if (pk.asymmetricKeyType === undefined)
        throw new Error('Error getting type of public ket');
    if (!(pk.asymmetricKeyType in keyTypeToArgs))
        throw new Error(`Unsupported key algorithm: ${pk.asymmetricKeyType}`);
    const tokenSignedByTunnelingPrivateKey = await tokenGenerator({
        claims: {},
        exp: '5m',
    });
    const linkResponse = await fetch(`${lcUrl}/api/org/${chosenOrg.slug}/profiles`, { method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ profileTunnellingPublicKey: pk.export({ format: 'jwk' }), tokenSignedByTunnelingPrivateKey }) });
    if (!linkResponse.ok)
        throw new Error(`Error while requesting to link ${linkResponse.status}: ${linkResponse.statusText}`);
    logger.info(`Linked current profile to org "${chosenOrg.name}" successfully! 🤘`);
};
//# sourceMappingURL=link.js.map