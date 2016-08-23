import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule }     from '@angular/http';

import { AppComponent } 	from './app.component';
import { APP_ROUTER } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { APIKeysComponent } from './apiKeys/apiKeys.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BlankComponent } from './blank/blank.component';
import { CodebooksComponent } from './codebooks/codebooks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeploymentComponent } from './deployment/deployment.component';
import { GeneralComponent } from './general/general.component';
import { LightsContainer } from './lights/containers/lights.container';
import { MobileConfigComponent } from './mobileConfig/mobileConfig.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { SettingsComponent } from './settings/settings.component';
import { SitesAllContainer } from './sites-all/containers/sites-all.container';
import { SitesGroupsComponent } from './sites-groups/containers/sites-groups.container';
import { SitesFavoritesComponent } from './sites-favorites/containers/sites-favorites.container';
import { SitesComponent } from './sites/sites.component';

import { Store, provideStore } from '@ngrx/store';
import { AppStore } from './app.store';
import { Observable } from 'rxjs/Observable';
import { LightsReducer } from './lights/lights';
import { UsersReducer, SelectedUserReducer } from './users/users';


// Imports for loading & configuring the in-memory web api for mock http server and mock data
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { MockData }   from './api/mock-data';

//usual imports
import { provide } from '@angular/core';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        APP_ROUTER,
        UsersModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        DashboardComponent,
        AuthenticationComponent,
        SettingsComponent,
        SitesComponent,
        LightsContainer,
        SitesFavoritesComponent,
        SitesGroupsComponent,
        SitesAllContainer,
        BlankComponent,
        GeneralComponent,
        CodebooksComponent,
        MobileConfigComponent,
        APIKeysComponent,
        DeploymentComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        provideStore({ LightsReducer, UsersReducer, SelectedUserReducer }), //add a store
        { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem mock http server
        { provide: SEED_DATA,  useClass: MockData }                // in-mem mock server data
    ]
})
export class AppModule {}