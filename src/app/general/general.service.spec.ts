import {
    addProviders,
    inject
} from '@angular/core/testing';

import { IBusinessAddress, BusinessAddress, IPointOfContact, GeneralSettingsService } from './general';

describe('GeneralSettingsService::', () => {

    beforeEach(() => {
        addProviders([
            GeneralSettingsService
        ]);
    });

    it('should instantiate by injection', inject([GeneralSettingsService], (service: GeneralSettingsService) => {
        expect(service).toEqual(jasmine.any(GeneralSettingsService));
    }));

});