// Imports for loading & configuring the in-memory web api for mock http server and mock data
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { MockData }   from './app/api/mock-data';

//usual imports
import { bootstrap }    	from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } 	from '@angular/core';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { provideForms, disableDeprecatedForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideStore }	 	from '@ngrx/store';
import { AppComponent } 	from './app/app.component';
import { MdIconRegistry } from '@angular2-material/icon/icon-registry';

import { LightsReducer } from './app/lights/lights';
import { UsersReducer, SelectedUserReducer } from './app/users/users';

export function main(): Promise<any> {

	return bootstrap(AppComponent, [
		APP_ROUTER_PROVIDERS,
		provide(LocationStrategy, {useClass: HashLocationStrategy}),
		provideStore({ LightsReducer, UsersReducer, SelectedUserReducer }), //add a store
		disableDeprecatedForms(),
		provideForms(),
		HTTP_PROVIDERS,
		MdIconRegistry,
		{ provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem mock http server
		{ provide: SEED_DATA,  useClass: MockData }                // in-mem mock server data
	])
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

