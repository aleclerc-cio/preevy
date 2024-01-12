export const serviceLinkEnvVars = (expectedServiceUrls) => Object.fromEntries(expectedServiceUrls
    .map(({ name, port, url }) => [`PREEVY_BASE_URI_${name.replace(/[^a-zA-Z0-9_]/g, '_')}_${port}`.toUpperCase(), url]));
//# sourceMappingURL=service-links.js.map