import { platformBrowserDynamic }    	from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } 	from '@angular/core';
import { bootloader } from '@angularclass/hmr';

export function main(): Promise<any> {
	return platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch(err => console.error(err));
}

// boot on document ready
bootloader(main);


