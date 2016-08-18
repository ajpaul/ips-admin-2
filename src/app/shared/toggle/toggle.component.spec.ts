import {
    addProviders,
    inject
} from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';

describe('ButtonComponent::', () => {

    beforeEach(() => {
        addProviders([ToggleComponent]);
    });

    it('should instantiate by injection', inject([ToggleComponent], (component: ToggleComponent) => {
        expect(component).toEqual(jasmine.any(ToggleComponent));
    }));

});