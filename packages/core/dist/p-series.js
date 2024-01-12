export const pSeries = async (funcs) => {
    const result = [];
    for (const func of funcs) {
        // eslint-disable-next-line no-await-in-loop
        result.push(await func());
    }
    return result;
};
//# sourceMappingURL=p-series.js.map