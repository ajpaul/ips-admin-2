import { platformBrowserDynamic }    	from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } 	from '@angular/core';

export function main(): Promise<any> {
	return platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch(err => console.error(err));
}

//Activate HMR if requested
if ('development' === ENV && HMR === true) {
	// activate hot module reload
	let ngHmr = require('angular2-hmr');
	ngHmr.hotModuleReplacement(main, module);
} else {
	// bootstrap when document is ready
	document.addEventListener('DOMContentLoaded', () => main());
}

