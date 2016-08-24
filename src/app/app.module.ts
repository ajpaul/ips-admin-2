import { NgModule } from '@angular/core';
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
import { UsersReducer, SelectedUserReducer } from './users/users';

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
        provideStore({ LightsReducer, UsersReducer, SelectedUserReducer }), //add a store
    ]
})
export class AppModule {}