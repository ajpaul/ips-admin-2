import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ISite, AllSitesService } from '../sites-all';

@Component({
    selector: 'app-sites-all',
    template: require('./sites-all.container.html'),
    styles: [require('./sites-all.container.less')],
    directives: [],
    providers: [AllSitesService]
})

export class SitesAllContainer {
    
    allSites: ISite[];
    errorMessage: string;



    constructor(private _allSitesService: AllSitesService) {}

    ngOnInit() {
        this._allSitesService.getSites().subscribe(
                sites => this.allSites = sites,
                error =>  this.errorMessage = <any>error); 
            
    }

    allSitesClick(siteId: number): void {
        alert('Opening site with siteId: ' + siteId);
    }
}
