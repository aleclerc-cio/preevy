import { ux } from '@oclif/core';
const BOOLEAN_PROMPT_YES = 'yes';
const BOOLEAN_PROMPT_NO = 'no';
export const BOOLEAN_PROMPT_OPTS = [BOOLEAN_PROMPT_YES, BOOLEAN_PROMPT_NO];
export const carefulBooleanPrompt = async (message) => {
    const handleResponse = async (response) => {
        if (!BOOLEAN_PROMPT_OPTS.includes(response)) {
            const newResponse = await ux.prompt(`Please type ${BOOLEAN_PROMPT_OPTS.join(' or ')}`, { required: true });
            return await handleResponse(newResponse);
        }
        return response === BOOLEAN_PROMPT_YES;
    };
    const response = await ux.prompt(message, { default: BOOLEAN_PROMPT_NO, required: true });
    return await handleResponse(response);
};
//# sourceMappingURL=prompt.js.map