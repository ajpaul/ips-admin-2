import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, BlankComponent,
    LightsContainer, AuthenticationComponent, NotFoundComponent,
    UsersContainer, SiteDetailContainer, GroupDetails, GroupSitesContainer, Login2Component } from './app';

export const routes: Routes = <Routes>[
    { path: '', component: DashboardComponent },
    { path: 'lights', component: LightsContainer },
    { path: 'users', component: UsersContainer },
    { path: 'detail', component: SiteDetailContainer },
    { path: 'groupsites', component: GroupSitesContainer },
    { path: 'group', component: GroupDetails },
    { path: 'login2', component: Login2Component },
    { path: 'login', component: AuthenticationComponent },
    { path: '**', component: NotFoundComponent } //404 support
];
​
export const APP_ROUTER = RouterModule.forRoot(routes, { useHash: true });
