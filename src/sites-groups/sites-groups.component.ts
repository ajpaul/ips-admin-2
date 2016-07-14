import { Component } from "@angular/core";
import { ButtonComponent } from '../ui/button/button.component';
import { SiteGroupsService } from './site-groups.service';
import { ISiteGroups } from './site-groups.interface';

import '../style/styles.less';
import './sites-groups.component.less';

@Component({
    selector: 'app-sites-groups',
    directives: [ButtonComponent],
    templateUrl: '../src/sites-groups/sites-groups.component.html',
    providers: [SiteGroupsService]
})

export class SitesGroupsComponent {
    
    headerTitle: string = "Sites > Site Groups"
    siteGroups: ISiteGroups[];

    constructor(private _siteGroupsService: SiteGroupsService) {

        this.siteGroups = this._siteGroupsService.getAllSiteGroups();
    }
}