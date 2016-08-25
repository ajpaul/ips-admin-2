import { Component } from '@angular/core';
import { ISiteFavorites, SiteFavoritesService } from '../sites-favorites';

@Component({
    selector: 'app-sites-groups',
    templateUrl: './sites-favorites.container.html',
    styleUrls: ['./sites-favorites.container.less']
})

export class SitesFavoritesComponent {
    
    siteFavs: ISiteFavorites[];
    errorMessage: string;

    constructor(private siteGroupsService: SiteFavoritesService) {}

    ngOnInit() {
        this.siteGroupsService.getSiteFavorites().subscribe(
                siteFavs => this.siteFavs = siteFavs,
                error =>  this.errorMessage = <any>error);
    }

    favoritesClick(): void {
        alert("Favorite selected. That's all I got right now.");
    }
}
