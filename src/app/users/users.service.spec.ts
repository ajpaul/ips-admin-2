import {
    addProviders,
    inject
} from '@angular/core/testing';
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http';
import { provideStore }	 	from '@ngrx/store';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { MockData }   from '../api/mock-data';

import { IUser, UsersService, UsersReducer, SelectedUserReducer } from './users';
import { ConfigService } from '../shared/config/config';
import 'rxjs/add/operator/catch';

describe('UsersService::InMemoryBackend::', () => {

    beforeEach(() => {
        addProviders([
            ConfigService,
            UsersService,
            HTTP_PROVIDERS,
            provideStore({ UsersReducer, SelectedUserReducer }), //add a store
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
                            userName: 'User 33',
                            email: '',
                            userID: 0,
                            organization_ID: 0,
                            tenant_ID: 0,
                            givenName: 'Test GivenName',
                            surname: 'Smith',
                            active: true, 
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

    describe('mockdata::', () => {
        var testService;
        beforeEach(inject([UsersService], (service: UsersService) => {
            testService = service;
        }));

        describe('injected::', () => {
            var service;
            beforeEach((done) => {
                service = testService;
                let user: IUser = {
                    userName: 'User 33',
                    email: '',
                    userID: 0,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true, 
                };
                service.selectUser(user);
                done();
            });

            it('should select user 33', (done) => {
                service.selectedUser.subscribe(
                    action => {
                        let user = <IUser>{};
                        expect(typeof action).toBe(typeof user);
                        expect(action.userName).toBe('User 33');
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
            ConfigService,
            UsersService,
            HTTP_PROVIDERS,
            provideStore({ UsersReducer, SelectedUserReducer }), //add a store
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
                    userName: 'User 33',
                    email: '',
                    userID: 0,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true, 
                };
                service.deleteUser(user);
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
            });

            it('Calls api endpoint to create a user', () => {
                service.usersUrl = 'someValidUrl';
                let spy = jasmine.createSpy('success');
                let user: IUser = {
                            userName: 'User 33',
                            email: '',
                            userID: 0,
                            organization_ID: 0,
                            tenant_ID: 0,
                            givenName: 'Test GivenName',
                            surname: 'Smith',
                            active: true, 
                        };
                service.createUser(user);
                expect(jasmine.Ajax.requests.mostRecent().method).toBe('PUT');
            });
        });
    });
});