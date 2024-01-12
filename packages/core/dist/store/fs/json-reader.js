export const jsonReader = (reader) => ({
    async readJSON(file) {
        const data = await reader.read(file);
        return data === undefined ? undefined : JSON.parse(data.toString());
    },
    async readJsonOrThrow(file) {
        const data = await reader.read(file);
        if (data === undefined) {
            throw new Error(`missing file: ${file}`);
        }
        return JSON.parse(data.toString());
    },
});
//# sourceMappingURL=json-reader.js.map