import { Args, ux } from '@oclif/core';
import { jwkThumbprint, jwkThumbprintUri, parseKey, profileStore } from '@preevy/core';
import { formatPublicKey } from '@preevy/common';
import ProfileCommand from '../../profile-command.js';
const keyTypes = ['private', 'public-pem', 'public-ssh', 'thumbprint', 'thumbprint-uri'];
const extractKey = (key, type) => {
    if (type === 'thumbprint-uri') {
        return jwkThumbprintUri(key);
    }
    if (type === 'thumbprint') {
        return jwkThumbprint(key);
    }
    if (type === 'public-pem') {
        return parseKey(key).getPublicPEM();
    }
    if (type === 'public-ssh') {
        return formatPublicKey(key);
    }
    if (type === 'private') {
        return parseKey(key).getPrivatePEM();
    }
    throw new Error(`Invalid key type "${type}"`);
};
// eslint-disable-next-line no-use-before-define
class Key extends ProfileCommand {
    async run() {
        const tunnelingKey = await profileStore(this.store).ref.tunnelingKey();
        if (tunnelingKey === undefined) {
            throw new Error('Could not find tunneling key in profile store');
        }
        const value = await extractKey(tunnelingKey, this.args.type);
        if (this.flags.json) {
            return value;
        }
        ux.log(value);
        return undefined;
    }
}
Key.description = 'Show profile key';
Key.strict = false;
Key.enableJsonFlag = true;
Key.args = {
    type: Args.custom({
        description: 'type of the key to show',
        options: keyTypes.map(s => s),
        default: 'thumbprint-uri',
    })(),
};
export default Key;
//# sourceMappingURL=key.js.map