import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ISite } from '../sites-all.interface';
import { AllSitesService } from '../sites-all.service';

@Component({
    selector: 'app-sites-all',
    templateUrl: './sites-all.container.html',
    styleUrls: ['./sites-all.container.less']
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
