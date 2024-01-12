import { initHook } from '@preevy/cli-common';
import { telemetryEmitter } from '@preevy/core';
const wrappedHook = async function wrappedHook(...args) {
    try {
        await initHook.call(this, ...args);
    }
    catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`warning: failed to init context: ${e}`);
        telemetryEmitter().capture('plugin-init-error', { error: e });
        await telemetryEmitter().flush();
        process.exit(1);
    }
};
export default wrappedHook;
//# sourceMappingURL=load-plugins.js.map