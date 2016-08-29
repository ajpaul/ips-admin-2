import {
    addProviders,
    inject
} from '@angular/core/testing';

import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';

import { ISiteFavorites } from './sites-favorites.interface';
import { SiteFavoritesService } from './sites-favorites.service';
import 'rxjs/add/operator/catch';

describe('SiteGroupsService::', () => {

    beforeEach(() => {
        addProviders([
            SiteFavoritesService,
            HTTP_PROVIDERS
        ]);
    });

    it('should instantiate by injection', inject([SiteFavoritesService], (service: SiteFavoritesService) => {
        expect(service).toEqual(jasmine.any(SiteFavoritesService));
    }));

});