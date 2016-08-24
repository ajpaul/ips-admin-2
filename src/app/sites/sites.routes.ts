import { Routes, RouterModule } from '@angular/router';
import { SitesComponent, SitesAllContainer, SitesGroupsComponent, SitesFavoritesComponent  } from './sites';

export const sitesRoutes: Routes = <Routes>[
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
        ]
    }
];

export const SITES_ROUTER = RouterModule.forChild(sitesRoutes);
