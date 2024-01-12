import { scriptInjectionsToLabels } from '@preevy/common';
import { mapValues } from 'lodash-es';
const addScriptInjectionsToService = (service, injections) => ({
    ...service,
    labels: {
        ...service.labels,
        ...scriptInjectionsToLabels(injections),
    },
});
export const addScriptInjectionsToServices = (services, factory) => mapValues(services, (def, name) => addScriptInjectionsToService(def, factory(name, def) ?? {}));
//# sourceMappingURL=script-injection.js.map