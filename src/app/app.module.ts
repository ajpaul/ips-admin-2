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

import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { AppStore } from './app.store';
import { Observable } from 'rxjs/Observable';
import { LightsReducer } from './lights';
import { UsersReducer, SelectedUserReducer, LoadingUserReducer, UserErrorsReducer } from './users';
import { SelectedOrgReducer } from './organizations';
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
        SharedModule,
        StoreModule.provideStore({ LightsReducer, UsersReducer, SelectedUserReducer, LoadingUserReducer, UserErrorsReducer, SelectedOrgReducer }), //add a store
        // Note that you must instrument after importing StoreModule
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: 'right'
            })
        }),
        StoreLogMonitorModule
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