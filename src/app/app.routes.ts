import { provideRouter, RouterConfig, DashboardComponent, SitesAllContainer,
     SitesGroupsComponent, BlankComponent, UsersContainer, LightsContainer, AuthenticationComponent, NotFoundComponent, 
SitesComponent, SitesFavoritesComponent, SiteDetailContainer, GroupSitesContainer, GroupDetails } from './app'


//BlankComponent == I haven't implemented it yet ​

export const routes: RouterConfig = <RouterConfig>[
    { path: '', component: DashboardComponent },
    { 
        path: 'sites', 
        component: SitesComponent,
        children: [
            { path: '', 
              redirectTo: 'all',
              pathMatch: 'full' 
            },
            { path: 'all', component: SitesAllContainer },
            { path: 'groups', component: SitesGroupsComponent },
            { path: 'favorites', component: SitesFavoritesComponent }
        ] },
    { path: 'lights', component: LightsContainer },
    { path: 'users', component: UsersContainer },
    { path: 'detail', component: SiteDetailContainer },
    { path: 'groupsites', component: GroupSitesContainer },
    { path: 'group', component: GroupDetails },

    { path: 'login', component: AuthenticationComponent },
    { path: '**', component: NotFoundComponent } //404 support
];
​
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
