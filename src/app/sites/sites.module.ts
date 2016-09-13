import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SitesComponent } from './sites.component';
import { SitesAllContainer } from '../sites-all';
import { SitesGroupsComponent } from '../sites-groups';
import { SitesFavoritesComponent } from '../sites-favorites';
import { SITES_ROUTER } from './sites.routes';
import { AllSitesService } from '../sites-all';
import { SiteGroupsService } from '../sites-groups';
import { SiteFavoritesService } from '../sites-favorites';

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