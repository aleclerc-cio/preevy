export const machineStatusNodeExporterCommand = {
    contentType: 'application/vnd.prom2json',
    recipe: {
        type: 'docker',
        command: ['http://localhost:9100/metrics'],
        image: 'prom/prom2json',
        network: 'host',
        tty: false,
    },
};
//# sourceMappingURL=machine-status-node-exporter.js.map