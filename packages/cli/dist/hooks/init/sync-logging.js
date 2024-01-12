const hook = async () => {
    [process.stdout, process.stderr].forEach(stream => {
        if (stream?.isTTY) {
            // eslint-disable-next-line no-underscore-dangle
            stream._handle?.setBlocking(true);
        }
    });
};
export default hook;
//# sourceMappingURL=sync-logging.js.map