import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, BlankComponent, SettingsComponent,
    LightsContainer, APIKeysComponent, CodebooksComponent, DeploymentComponent, 
    MobileConfigComponent, GeneralComponent, AuthenticationComponent, NotFoundComponent,
    SitesComponent, UsersContainer } from './app';


//BlankComponent == I haven't implemented it yet ​

export const routes: Routes = <Routes>[
    { path: '', component: DashboardComponent },
    { path: 'lights', component: LightsContainer },
    { path: 'users', component: UsersContainer },
    { 
        path: 'settings', 
        component: SettingsComponent,
        children: [
            { path: '', component: BlankComponent }, //this is a dummy component...can't fix this?
            { path: 'general', component: GeneralComponent },
            { path: 'codebooks', component: CodebooksComponent },
            { path: 'mobile-config', component: MobileConfigComponent },
            { path: 'api-keys', component: APIKeysComponent },
            { path: 'deployment', component: DeploymentComponent }
        ] 
    },
    { path: 'login', component: AuthenticationComponent },
    { path: '**', component: NotFoundComponent } //404 support
];
​
export const APP_ROUTER = RouterModule.forRoot(routes, { useHash: true });
