/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */

import EventEmitter from 'events';
import JSLogger, { ILogger, ILoggerOpts, ILogHandler, ILogLevel } from 'js-logger';
import type { GlobalLogger } from 'js-logger';

export class LoggerClass extends EventEmitter implements GlobalLogger {
	TRACE: ILogLevel;
	DEBUG: ILogLevel;
	INFO: ILogLevel;
	TIME: ILogLevel;
	WARN: ILogLevel;
	ERROR: ILogLevel;
	OFF: ILogLevel;

	constructor() {
		super();

		JSLogger.useDefaults({
			defaultLevel: JSLogger.TRACE,
			formatter: function (messages: any, ctx) {
				let color;
				if (ctx.level === JSLogger.TRACE) color = '\x1b[91m';
				if (ctx.level === JSLogger.DEBUG) color = '\x1b[2m';
				if (ctx.level === JSLogger.INFO) color = '\x1b[36m';
				if (ctx.level === JSLogger.TIME) color = '\x1b[97m';
				if (ctx.level === JSLogger.WARN) color = '\x1b[93m';
				if (ctx.level === JSLogger.ERROR) color = '\x1b[91m';
        
				const date = new Date();
				messages[0] = `${color}[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}/${ctx.level.name}]\x1b[0m ${
					messages[0]
				}`;
			},
		});

		Object.assign(this, JSLogger);
	}

    // Only typings, Object.assign goes brooooo    
	useDefaults(options?: ILoggerOpts): void {}
	setHandler(logHandler: ILogHandler): void {}
	get(name: string): ILogger { return JSLogger.get(name); }
	createDefaultHandler(options?: { formatter?: ILogHandler }): ILogHandler { return JSLogger.createDefaultHandler(options); }

	trace(...x: any[]): void {}
	debug(...x: any[]): void {}
	info(...x: any[]): void {}
	log(...x: any[]): void {}
	warn(...x: any[]): void {}
	error(...x: any[]): void {}
	time(label: string): void {}
	timeEnd(label: string): void {}
    
	setLevel(level: ILogLevel): void {}
	getLevel(): ILogLevel { return JSLogger.getLevel(); }
	enabledFor(level: ILogLevel): boolean { return JSLogger.enabledFor(level); }
}

export const Logger = new LoggerClass();