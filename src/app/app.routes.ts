import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, BlankComponent,
    LightsContainer, AuthenticationComponent, NotFoundComponent,
    UsersContainer, SiteDetailContainer, GroupDetails, GroupSitesContainer } from './app';


//BlankComponent == I haven't implemented it yet ​

export const routes: Routes = <Routes>[
    { path: '', component: DashboardComponent },
    { path: 'lights', component: LightsContainer },
    { path: 'users', component: UsersContainer },
    { path: 'detail', component: SiteDetailContainer },
    { path: 'groupsites', component: GroupSitesContainer },
    { path: 'group', component: GroupDetails },

    { path: 'login', component: AuthenticationComponent },
    { path: '**', component: NotFoundComponent } //404 support
];
​
export const APP_ROUTER = RouterModule.forRoot(routes, { useHash: true });
