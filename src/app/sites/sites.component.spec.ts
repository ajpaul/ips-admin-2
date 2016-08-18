import {
    addProviders,
    inject
} from '@angular/core/testing';

import { SitesComponent } from './sites.component';

describe('GeneralComponent::', () => {

    beforeEach(() => {
        addProviders([
            SitesComponent
        ]);
    });

    it('should instantiate by injection', inject([SitesComponent], (component: SitesComponent) => {
        expect(component).toEqual(jasmine.any(SitesComponent));
    }));

});