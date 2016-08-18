import {Component, ISiteGroups, SiteGroupsService, ButtonComponent, FilterComponent
     } from '../sites-groups';

@Component({
    selector: 'app-sites-groups',
    template: require('./sites-groups.container.html'),
    styles: [require('./sites-groups.container.less')],
    directives: [ButtonComponent, FilterComponent],
    providers: [SiteGroupsService]
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
