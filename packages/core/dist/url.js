export const tryParseUrl = (s) => {
    try {
        return new URL(s);
    }
    catch (e) {
        return undefined;
    }
};
//# sourceMappingURL=url.js.map