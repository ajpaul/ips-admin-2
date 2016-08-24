import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SitesComponent, SitesAllContainer, SitesFavoritesComponent, SitesGroupsComponent } from './sites';
import { SITES_ROUTER } from './sites.routes';
import { AllSitesService } from '../sites-all/sites-all';
import { SiteGroupsService } from '../sites-groups/sites-groups';
import { SiteFavoritesService } from '../sites-favorites/sites-favorites';

@NgModule({
    imports: [
        SharedModule,
        SITES_ROUTER
    ],
    declarations: [
        SitesComponent,
        SitesAllContainer,
        SitesFavoritesComponent,
        SitesGroupsComponent
    ],
    exports: [
        SitesComponent
    ],
    providers: [
        AllSitesService,
        SiteGroupsService,
        SiteFavoritesService
    ]
})
export class SitesModule {}