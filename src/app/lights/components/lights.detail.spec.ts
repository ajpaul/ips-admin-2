import {
    addProviders,
    inject
} from '@angular/core/testing';

import { LightsDetail } from './lights.detail';

describe('LightsDetail::', () => {

    beforeEach(() => {
        addProviders([LightsDetail]);
    });

    it('should instantiate by injection', inject([LightsDetail], (component: LightsDetail) => {
        expect(component).toEqual(jasmine.any(LightsDetail));
    }));
});