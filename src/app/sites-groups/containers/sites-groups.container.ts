import { Component } from '@angular/core';
import {ISiteGroups, SiteGroupsService } from '../sites-groups';

@Component({
    selector: 'app-sites-groups',
    templateUrl: './sites-groups.container.html',
    styleUrls: ['./sites-groups.container.less']
})

export class SitesGroupsComponent {
    
    siteGroups: ISiteGroups[];
    errorMessage: string;

    constructor(private _siteGroupsService: SiteGroupsService) {}

    ngOnInit() {
        this._siteGroupsService.getSiteGroups().subscribe(
                siteGroups => this.siteGroups = siteGroups,
                error =>  this.errorMessage = <any>error);
    }

    sitesGroupsClick(siteGroupID: number): void {
        alert('Opening site with siteId: ' + siteGroupID);
    }
}
