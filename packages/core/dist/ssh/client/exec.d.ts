import ssh2 from 'ssh2';
import { CommandExecuter } from '../../command-executer.js';
export declare const execCommand: (ssh: ssh2.Client) => CommandExecuter;
