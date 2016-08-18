import {
    addProviders,
    inject
} from '@angular/core/testing';

import { SiteDetailComponent } from './site-detail.component';

describe('GeneralComponent::', () => {

    beforeEach(() => {
        addProviders([
            SiteDetailComponent,
        ]);
    });

    it('should instantiate by injection', inject([SiteDetailComponent], (component: SiteDetailComponent) => {
        expect(component).toEqual(jasmine.any(SiteDetailComponent));
    }));

});