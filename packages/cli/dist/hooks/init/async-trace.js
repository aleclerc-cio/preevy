import ah from 'async_hooks';
const hook = async () => {
    const traces = new Map();
    const originalCaptureStackTrace = global.Error.captureStackTrace;
    const captureStackTrace = (what, where) => {
        originalCaptureStackTrace.call(global.Error, what, where);
        const trace = traces.get(ah.executionAsyncId());
        if (trace)
            what.stack += trace;
    };
    ah.createHook({
        init(id) {
            const trace = {};
            Error.captureStackTrace(trace);
            traces.set(id, trace.stack.replace(/(^.+$\n){6}/m, '\n'));
        },
        destroy(id) {
            traces.delete(id);
        },
    }).enable();
    global.Error.captureStackTrace = captureStackTrace;
};
export default hook;
//# sourceMappingURL=async-trace.js.map