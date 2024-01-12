import { Logger } from '../log.js';
import { MachineDriver } from '../driver/driver.js';
declare const ls: ({ machineDriver, }: {
    machineDriver: MachineDriver;
    log: Logger;
}) => Promise<AsyncIterableIterator<import("../index.js").PartialMachine | import("../index.js").MachineBase>>;
export default ls;
