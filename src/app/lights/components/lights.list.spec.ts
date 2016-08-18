import {
    addProviders,
    inject
} from '@angular/core/testing';

import { LightsList } from './lights.list';

describe('LightsList::', () => {

    beforeEach(() => {
        addProviders([LightsList]);
    });

    it('should instantiate by injection', inject([LightsList], (component: LightsList) => {
        expect(component).toEqual(jasmine.any(LightsList));
    }));
});