//usual imports
import { bootstrap }    	from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } 	from '@angular/core';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { provideForms, disableDeprecatedForms } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideStore }	 	from '@ngrx/store';
import { AppComponent } 	from './app/app.component';
import { LightsReducer } from './app/lights/lights';
import { UsersReducer, SelectedUserReducer, LoadingUserReducer } from './app/users/users';
import { ConfigService } from './app/shared/config/config';

export function main(): Promise<any> {

	return bootstrap(AppComponent, [
		APP_ROUTER_PROVIDERS,
		provide(LocationStrategy, {useClass: HashLocationStrategy}),
		provideStore({ LightsReducer, UsersReducer, SelectedUserReducer, LoadingUserReducer }), //add a store
		disableDeprecatedForms(),
		provideForms(),
		HTTP_PROVIDERS,
		ConfigService
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

