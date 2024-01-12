import { ScriptInjection } from '@preevy/common';
import { ComposeModel, ComposeService } from './model.js';
export declare const addScriptInjectionsToServices: (services: ComposeModel['services'], factory: (serviceName: string, serviceDef: ComposeService) => Record<string, ScriptInjection> | undefined) => ComposeModel['services'];
