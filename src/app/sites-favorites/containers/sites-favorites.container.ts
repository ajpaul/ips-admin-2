import { Component } from '@angular/core';
import { ISiteFavorites, SiteFavoritesService } from '../sites-favorites';

@Component({
    selector: 'app-sites-groups',
    template: require('./sites-favorites.container.html'),
    styles: [require('./sites-favorites.container.less')]
})

export class SitesFavoritesComponent {
    
    siteFavs: ISiteFavorites[];
    errorMessage: string;

    constructor(private _siteGroupsService: SiteFavoritesService) {}

    ngOnInit() {
        this._siteGroupsService.getSiteFavorites().subscribe(
                siteFavs => this.siteFavs = siteFavs,
                error =>  this.errorMessage = <any>error);
    }

    favoritesClick(): void {
        alert("Favorite selected. That's all I got right now.");
    }
}
