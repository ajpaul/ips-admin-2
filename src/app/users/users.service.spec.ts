import {
    addProviders,
    inject
} from '@angular/core/testing';
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';
import { provideStore }	 	from '@ngrx/store';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { MockData }   from '../api/mock-data';

import { IUser, UsersService, UsersReducer } from './users';
import 'rxjs/add/operator/catch';

describe('UsersService::InMemoryBackend::', () => {

    beforeEach(() => {
        addProviders([
            UsersService,
            HTTP_PROVIDERS,
            provideStore({ UsersReducer }), //add a store
            { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem mock http server
            { provide: SEED_DATA,  useClass: MockData }                // in-mem mock server data
        ]);
    });

    describe('mockdata::', () => {
        var testService;
        beforeEach(inject([UsersService], (service: UsersService) => {
            testService = service;
        }));

        describe('injected::', () => {
            var service;
            beforeEach((done) => {
                service = testService;
                service.getUsers(done);
            });

            it('should get users', (done) => {
                service.userUrl = 'localhost:8080/users';
                service.users.subscribe(
                        action => {
                        expect(action.length).toBeGreaterThan(0);
                        let user: IUser = {
                            'displayName': 'User 33',
                            'displayEmail': '',
                            'bookmarked': false
                        };
                        expect(typeof action).toBe(typeof user);
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

describe('UsersService::JasmineAjax::', () => {
    beforeEach(() => {
        addProviders([
            UsersService,
            HTTP_PROVIDERS,
            provideStore({ UsersReducer }), //add a store
        ]);
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });


    describe('withAjax::', () => {
        var testService;
        beforeEach(inject([UsersService], (service: UsersService) => {
            testService = service;
        }));

        describe('injected::', () => {
            var service;
            beforeEach(() => {
                service = testService;
            });

            it('Calls api endpoint to retrieve users', () => {
                service.usersUrl = 'someValidUrl';
                let spy = jasmine.createSpy('success');
                service.getUsers();
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
            });

            it('Calls api endpoint to delete a user', () => {
                service.usersUrl = 'someValidUrl';
                let spy = jasmine.createSpy('success');
                let user: IUser = {
                    'displayName': 'User 33',
                    'displayEmail': '',
                    'bookmarked': false
                };
                service.deleteUser(user);
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
            });

            it('Calls api endpoint to create a user', () => {
                service.usersUrl = 'someValidUrl';
                let spy = jasmine.createSpy('success');
                let user: IUser = {
                    'displayName': 'User 33',
                    'displayEmail': '',
                    'bookmarked': false
                };
                service.createUser(user);
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('PUT');
            });
        });
    });
});