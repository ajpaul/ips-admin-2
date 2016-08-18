import {
    addProviders,
    inject
} from '@angular/core/testing';

import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { MockData }   from '../api/mock-data';

import { ISiteFavorites } from './sites-favorites.interface';
import { SiteFavoritesService } from './sites-favorites.service';
import 'rxjs/add/operator/catch';

describe('SiteGroupsService::', () => {

    beforeEach(() => {
        addProviders([
            SiteFavoritesService,
            HTTP_PROVIDERS,
            { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem mock http server
            { provide: SEED_DATA,  useClass: MockData }                // in-mem mock server data
        ]);
    });

    it('should instantiate by injection', inject([SiteFavoritesService], (service: SiteFavoritesService) => {
        expect(service).toEqual(jasmine.any(SiteFavoritesService));
    }));

});