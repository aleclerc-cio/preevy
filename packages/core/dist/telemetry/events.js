export const serializableEvent = (event) => ({
    ...event,
    timestamp: new Date(event.timestamp).toISOString(),
});
//# sourceMappingURL=events.js.map