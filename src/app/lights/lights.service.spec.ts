import {
    addProviders,
    inject
} from '@angular/core/testing';
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';
import { provideStore }	 	from '@ngrx/store';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { MockData }   from '../api/mock-data';

import { ILight, LightsService, LightsReducer } from './lights';
import 'rxjs/add/operator/catch';

describe('LightsService::InMemoryBackend::', () => {

    beforeEach(() => {
        addProviders([
            LightsService,
            HTTP_PROVIDERS,
            provideStore({ LightsReducer }), //add a store
            { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem mock http server
            { provide: SEED_DATA,  useClass: MockData }                // in-mem mock server data
        ]);
    });

    describe('mockdata::', () => {
        var testService;
        beforeEach(inject([LightsService], (service: LightsService) => {
            testService = service;
        }));

        describe('injected::', () => {
            var service;
            beforeEach((done) => {
                service = testService;
                service.getLights(done);
            });

            it('should get lights', (done) => {
                service.lightsUrl = 'localhost:8080/lights';
                expect(1).toBe(1);
                service.lights.subscribe(
                    action => {
                        expect(action.length).toBeGreaterThan(0);
                        let lightType: ILight = {
                            'luminaireTypeId': 1,
                            'organization_ID': 1,
                            'displayName': 'Light 1',
                            'exteriorWidth': 2,
                            'exteriorLength': 2,
                            'interiorWidth': 2,
                            'interiorLength': 1
                        };
                        expect(typeof action).toBe(typeof lightType);
                        done();
                    },
                    err => {
                        expect(err).toBe(0);
                        done();
                    }
                );
            });
        });
    });
});

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