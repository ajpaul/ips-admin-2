import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { provideStore }	 	from '@ngrx/store';
import { IUser, UsersService, UsersReducer, SelectedUserReducer } from './users';
import 'rxjs/add/operator/catch';


import { XHRBackend, HTTP_PROVIDERS,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    ConnectionBackend,
    Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('UsersService::', () => {
    var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    beforeEach(() => {
        addProviders([
            UsersService,
            HTTP_PROVIDERS,
            provideStore({ UsersReducer, SelectedUserReducer }), //add a store
        ]);
        jasmine.Ajax.install();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    describe('JasmineAjax::', () => {
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

            it('should select user 123', (done) => {
                let user: IUser = {
                    'displayName': 'User 123',
                    'displayEmail': 'foo@bar.com',
                    'bookmarked': false
                };
                service.selectUser(user);
                service.selectedUser.subscribe(
                        action => {
                        let user = <IUser>{};
                        expect(typeof action).toBe(typeof user);
                        expect(action.displayName).toBe('User 123');
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

describe('UsersService::', () => {
    var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    beforeEach(() => {
        addProviders([
            UsersService,
            MockBackend,
            BaseRequestOptions,
            provide(
                Http, {
                    useFactory: (mockbackend:ConnectionBackend,
                                 defaultOptions:BaseRequestOptions) => {
                        return new Http(mockbackend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ),
            provideStore({UsersReducer, SelectedUserReducer}), //add a store
        ]);
    });

    describe('MockBackend::', () => {
        var testService;
        var mockResponse: any;
        var mockBackend;
        var mock: any;

        beforeEach(inject([UsersService, MockBackend], (service:UsersService, backend) => {
            testService = service;
            mockBackend = backend;

            mock = require('../api/mock-response.js');
            mockBackend.connections.subscribe((conn) => {
                mockResponse = new mock(require('../../../mocks/users.js'));
                conn.mockRespond(new Response(new ResponseOptions(mockResponse.getResponse(conn.request))));
            });

        }));

        describe('mockAPI::', () => {
            var service;
            beforeEach((done) => {
                service = testService;
                service.userUrl = 'users?scenario=singleResult&scope=success';
                service.getUsers(done);
            });

            it('should get users', (done) => {
                service.users.subscribe(
                        action => {
                        expect(action.length).toBeGreaterThan(0);
                        let user:IUser = {
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

