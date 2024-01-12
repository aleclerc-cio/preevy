export const measureTime = async (f) => {
    const startTime = Date.now();
    const result = await f();
    const elapsedTimeSec = (new Date().getTime() - startTime) / 1000;
    return { result, elapsedTimeSec };
};
//# sourceMappingURL=timing.js.map