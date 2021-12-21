import {GClient} from '../GClient';
import {Plugins} from '../managers/PluginManager';
import Logger from 'js-logger';
import {ResolveValidationErrorLocate} from '../util/ResolveValidationErrorLocate';

export interface PluginOptions {
	beforeInitialization?: (client: GClient) => any;
	beforeLogin?: (client: GClient) => any;
	afterLogin?: (client: GClient) => any;
}

export class Plugin {
	public readonly name: string;
	public readonly beforeInitialization?: (client: GClient) => any;
	public readonly beforeLogin?: (client: GClient) => any;
	public readonly afterLogin?: (client: GClient) => any;

	public constructor(name: string, options: PluginOptions) {
		this.name = name;
		Object.assign(this, options);

		Plugins.register(this);
	}

	public static validate(plugin: Plugin): boolean | void {
		const locate = ResolveValidationErrorLocate([
			plugin.name,
		]);

		if (!plugin.name) return Logger.warn('Plugin must have a name', locate);
		else if (typeof plugin.name !== 'string') return Logger.warn('Plugin name must be a string', locate);
		else if (typeof plugin.beforeInitialization !== 'function' && typeof plugin.beforeLogin !== 'function' && typeof plugin.afterLogin !== 'function') return Logger.warn('Plugin must have run a function', locate);
		else return true;
	}
}
