import {
    addProviders,
    inject
} from '@angular/core/testing';

import { GeneralComponent } from './general.component';
import { GeneralSettingsService } from './general';

describe('GeneralComponent::', () => {

    beforeEach(() => {
        addProviders([
            GeneralComponent,
            GeneralSettingsService
        ]);
    });

    it('should instantiate by injection', inject([GeneralComponent], (component: GeneralComponent) => {
        expect(component).toEqual(jasmine.any(GeneralComponent));
    }));

});