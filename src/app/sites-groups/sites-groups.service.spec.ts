import {
    addProviders,
    inject
} from '@angular/core/testing';

import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';

import { ISiteGroups, SiteGroupsService } from './sites-groups';
import 'rxjs/add/operator/catch';

describe('SiteGroupsService::', () => {

    beforeEach(() => {
        addProviders([
            SiteGroupsService,
            HTTP_PROVIDERS
        ]);
    });

    it('should instantiate by injection', inject([SiteGroupsService], (service: SiteGroupsService) => {
        expect(service).toEqual(jasmine.any(SiteGroupsService));
    }));

});