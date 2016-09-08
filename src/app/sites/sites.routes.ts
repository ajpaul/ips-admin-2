import { Routes, RouterModule } from '@angular/router';
import { SitesComponent } from './sites.component';
import { SitesAllContainer } from '../sites-all';
import { SitesGroupsComponent } from '../sites-groups';
import { SitesFavoritesComponent  } from '../sites-favorites';

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
