import {
    addProviders,
    inject
} from '@angular/core/testing';

import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';

import { ISite, AllSitesService } from './';
import 'rxjs/add/operator/catch';

describe('AllSitesService::', () => {

    beforeEach(() => {
        addProviders([
            AllSitesService,
            HTTP_PROVIDERS
        ]);
    });

    it('should instantiate by injection', inject([AllSitesService], (service: AllSitesService) => {
        expect(service).toEqual(jasmine.any(AllSitesService));
    }));

});