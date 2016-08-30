import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule }     from '@angular/http';

import { AppComponent } 	from './app.component';
import { APP_ROUTER } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { SitesModule } from './sites/sites.module';
import { UsersModule } from './users/users.module';

import {
    AuthenticationComponent,
    BlankComponent,
    DashboardComponent,
    GroupDetails,
    GroupSitesComponent,
    GroupSitesContainer,
    LightsContainer,
    NotFoundComponent,
    SiteDetailContainer,
    SitesGroupsComponent} from './app';

import { Store, provideStore } from '@ngrx/store';
import { AppStore } from './app.store';
import { Observable } from 'rxjs/Observable';
import { LightsReducer } from './lights/lights';
import { UsersReducer, SelectedUserReducer, LoadingUserReducer, UserErrorsReducer } from './users/users';
import { SelectedOrgReducer } from './organizations/organizations';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

//usual imports
import { provide } from '@angular/core';


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        APP_ROUTER,
        SitesModule,
        UsersModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        GroupDetails,
        GroupSitesContainer,
        GroupSitesComponent,
        SiteDetailContainer,
        NotFoundComponent,
        DashboardComponent,
        AuthenticationComponent,
        LightsContainer,
        BlankComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        provideStore({ LightsReducer, UsersReducer, SelectedUserReducer, LoadingUserReducer, UserErrorsReducer, SelectedOrgReducer }), //add a store
    ]
})
export class AppModule {

    constructor(public appRef: ApplicationRef) {}

    hmrOnInit(store) {

    }

    hmrOnDestroy(store) {
        var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
    
}