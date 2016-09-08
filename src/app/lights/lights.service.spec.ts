import {
    addProviders,
    inject
} from '@angular/core/testing';
import { HTTP_PROVIDERS } from '@angular/http';
import { provideStore }	 	from '@ngrx/store';

import { ILight, LightsService, LightsReducer } from './';
import 'rxjs/add/operator/catch';

describe('LightsService::JasmineAjax::', () => {
    beforeEach(() => {
        addProviders([
            LightsService,
            HTTP_PROVIDERS,
            provideStore({ LightsReducer }), //add a store
        ]);
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe('withAjax::', () => {
        var testService;
        beforeEach(inject([LightsService], (service: LightsService) => {
            testService = service;
        }));

        describe('injected::', () => {
            var service;
            beforeEach(() => {
                service = testService;
            });

            it('Calls api endpoint to retrieves lights', () => {
                service.lightsUrl = 'someValidUrl';
                let spy = jasmine.createSpy('success');
                service.getLights();
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
            });

            it('Calls api endpoint to delete a light', () => {
                service.lightsUrl = 'someValidUrl';
                let spy = jasmine.createSpy('success');
                let light: ILight = {
                    'luminaireTypeId': 1,
                    'organization_ID': 1,
                    'displayName': 'Light 1',
                    'exteriorWidth': 2,
                    'exteriorLength': 2,
                    'interiorWidth': 2,
                    'interiorLength': 1
                };
                service.deleteLight(light);
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
            });
        });
    });
});