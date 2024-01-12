import fs from 'fs';
const DEFAULT_BASE_FILES = ['compose', 'docker-compose'];
const DEFAULT_OVERRIDE_FILES = DEFAULT_BASE_FILES.map(f => `${f}.override`);
const DEFAULT_SYSTEM_FILES = DEFAULT_BASE_FILES.map(f => `${f}.preevy`);
const YAML_EXTENSIONS = ['yaml', 'yml'];
const fileExists = async (filename) => {
    let h;
    try {
        h = await fs.promises.open(filename, 'r');
    }
    catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        }
        throw e;
    }
    void h?.close();
    return true;
};
const filterExistingFiles = async (...filenames) => (await Promise.all(filenames.map(async (filename) => ({ exists: await fileExists(filename), filename })))).filter(({ exists }) => exists).map(({ filename }) => filename);
const oneYamlFileArray = async (baseNames, type) => {
    const existingFiles = await filterExistingFiles(...baseNames.flatMap(f => YAML_EXTENSIONS.map(e => `${f}.${e}`)));
    if (!existingFiles.length) {
        return undefined;
    }
    if (existingFiles.length > 1) {
        throw new Error(`Multiple ${type} files found: ${existingFiles.join(', ')}`);
    }
    return existingFiles;
};
const findDefaultFiles = async () => (await oneYamlFileArray(DEFAULT_BASE_FILES, 'default Compose'))
    ?? (await oneYamlFileArray(DEFAULT_OVERRIDE_FILES, 'default Compose override'))
    ?? [];
const findDefaultSystemFiles = async () => (await oneYamlFileArray(DEFAULT_SYSTEM_FILES, 'default system Compose')) ?? [];
export const resolveComposeFiles = async ({ userSpecifiedFiles, userSpecifiedSystemFiles }) => [
    ...(userSpecifiedSystemFiles.length ? userSpecifiedSystemFiles : await findDefaultSystemFiles()),
    ...(userSpecifiedFiles.length ? userSpecifiedFiles : await findDefaultFiles()),
];
//# sourceMappingURL=files.js.map