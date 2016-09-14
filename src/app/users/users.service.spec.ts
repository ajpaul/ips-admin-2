import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { provideStore }	 	from '@ngrx/store';
import { IUser, UsersService, UsersReducer, SelectedUserReducer, UserErrorsReducer, LoadingUserReducer, DeletingUserReducer} from './';
import { CREATE_USERS, SELECT_USER } from './users.reducer';
import { Loading } from '../shared/loading-list';
import { SelectedOrgReducer } from '../organizations';
import { ConfigService } from '../shared/config';
import 'rxjs/add/operator/catch';

import { BaseRequestOptions, Response, ResponseOptions, ConnectionBackend, Http, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('UsersService::', () => {
    beforeEach(() => {
        addProviders([
            ConfigService,
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
            provideStore({UsersReducer, SelectedUserReducer, SelectedOrgReducer, UserErrorsReducer, LoadingUserReducer, DeletingUserReducer}), //add a store
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

        describe('Store::', () => {
            var service;
            beforeEach(()=>{
                service = testService;
            });

            it('Initializes and builds URLs from the config', (done) => {
                expect(service.usersUrl).toBeDefined();
                service.selectedOrg.subscribe((org) => {
                    expect(service.organizationId).toBe(org);
                    done();
                });
            });

            it('should reset the selected user to an empty user', (done) => {
                service.resetUser();
                service.selectedUser.subscribe(
                        action => {
                        let user = <IUser>{};
                        expect(typeof action).toBe(typeof user);
                        expect(action.userID).toBeNull();
                        done();
                    }
                );
            });

            it('should clear deleting loading when selecting user', (done) => {
                let user: IUser = {
                    userName: 'User 123',
                    email: 'foo@bar.com',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                };
                service.selectUser(user);
                service.deletingUser.subscribe(
                        action => {
                        expect(action).toBe(Loading.NotLoading);
                        done();
                    }
                );
            });

            it('should select user 123', (done) => {
                let user: IUser = {
                    userName: 'User 123',
                    email: 'foo@bar.com',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                };
                service.selectUser(user);
                service.selectedUser.subscribe(
                        action => {
                        expect(action.userName).toBe('User 123');
                        done();
                    }
                );
            });

            it('should clear the selected user', (done) => {
                let user: IUser = {
                    userName: 'User 123',
                    email: 'foo@bar.com',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                };
                service.selectUser(user);
                service.clearSelectedUser();
                service.selectedUser.subscribe(
                        action => {
                        expect(action).toBe(null);
                        done();
                    }
                );
            });
        });

        describe('mockAPI::getUsers', () => {
            var service;
            var conn;
            beforeEach((done) => {
                mockBackend.connections.subscribe((c) => { conn = c } );
                service = testService;
                service.orgUsersUrl = service.configService.getConfig().orgUsersEndpoint + service.organizationId + '?scenario=multipleResults&scope=success';
                service.getUsers(done);
            });

            it('Calls api endpoint to retrieve users', () => {
                expect(conn.request.method).toBe(RequestMethod.Get);
            });

            it('clears errors', (done) => {
                service.userErrors.subscribe(
                    action => {
                        expect(action).toEqual([]);
                        done();
                    }
                );
            });

            it('should get users', (done) => {
                service.users.subscribe(
                        action => {
                        expect(action.length).toBeGreaterThan(0);
                        let user:IUser = {
                            userName: 'User 123',
                            email: 'foo@bar.com',
                            userID: 0,
                            organization_ID: 0,
                            tenant_ID: 0,
                            givenName: 'Test GivenName',
                            surname: 'Smith',
                            active: true,
                        };
                        expect(typeof action).toBe(typeof user);
                        done();
                    }
                );
            });

            it('should select the first returned user', (done) => {
                service.users.subscribe(
                    users => {
                        service.selectedUser.subscribe(
                            selectedUser => {
                                expect(selectedUser).toEqual(users[0]);
                                done();
                            }
                        );
                    }
                );
            });
        });



        describe('mockAPI::createUser::', () => {
            var service;
            var conn;

            beforeEach((done) => {
                mockBackend.connections.subscribe((c) => { conn = c } );
                service = testService;
                service.usersUrl = service.configService.getConfig().usersEndpoint; //'?scenario=multipleResults&scope=success';
                let user: IUser = {
                    userName: 'User 123',
                    email: 'foo@bar.com',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                };
                service.createUser(user, done);
            });

            it('Calls api endpoint to create a user', () => {
                expect(conn.request.method).toBe(RequestMethod.Put);
            });


            it('clears errors', (done) => {
                service.userErrors.subscribe(
                    action => {
                        expect(action).toEqual([]);
                        done();
                    }
                );
            });

            it('should add the user to the list of users', (done) => {
                service.users.subscribe(
                    action => {
                        expect(action.length).toBe(1);
                        let user:IUser = {
                            userName: 'User 123',
                            email: 'foo@bar.com',
                            userID: 1,
                            organization_ID: 0,
                            tenant_ID: 0,
                            givenName: 'Test GivenName',
                            surname: 'Smith',
                            active: true,
                        };
                        expect(typeof action).toBe(typeof user);
                        done();
                    }
                );
            });

            it('should select the created user', (done) => {
                service.selectedUser.subscribe(
                    action => {
                        let user:IUser = {
                            userName: 'User 123',
                            email: 'foo@bar.com',
                            userID: 1,
                            organization_ID: 0,
                            tenant_ID: 0,
                            givenName: 'Test GivenName',
                            surname: 'Smith',
                            active: true,
                        };
                        expect(typeof action).toBe(typeof user);
                        done();
                    }
                );
            });
        });

        describe('mockAPI::updateUser::', () => {
            var service;
            var conn;
            let user: IUser;
            beforeEach((done) => {
                mockBackend.connections.subscribe((c) => { conn = c } );
                service = testService;
                service.usersUrl = service.configService.getConfig().usersEndpoint; //'?scenario=multipleResults&scope=success';
                let origuser = {
                    userName: 'User 123',
                    email: 'foo@bar.com',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                };
                service.store.dispatch({type: CREATE_USERS, payload: [origuser]});

                user = {
                    userID: 1,
                    organization_ID: 1,
                    tenant_ID: 1,
                    userName: 'john.snow@thisemail.com',
                    email: 'johnsnow@email.com',
                    givenName: 'John',
                    surname: 'Snow',
                    active: true
                };
                service.updateUser(user, done);
            });

            it('Calls api endpoint to update a user', () => {
                expect(conn.request.method).toBe(RequestMethod.Post);
            });

            it('updates the user in the user list', (done) => {
                service.users.subscribe(
                    action => {
                        expect(action.length).toBe(1);
                        expect(action[0].userName).toEqual('john.snow@thisemail.com');
                        done();
                    }
                )
            });

            it('updates the selected user', (done) => {
                service.selectedUser.subscribe(
                    action => {
                        expect(action.userName).toEqual('john.snow@thisemail.com');
                        done();
                    }
                )
            });
        });

        describe('mockAPI::with1User::', () => {
            var s;
            var mb;
            let user: IUser;
            beforeEach(()=>{
                s = testService;
                mb = mockBackend;

                user = {
                    userName: 'User 123',
                    email: 'foo@bar.com',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                };
                s.store.dispatch({type: CREATE_USERS, payload: [user]});
                s.store.dispatch({type: SELECT_USER, payload: user});
            });

            it('has users to delete', (done)=>{
                s.users.subscribe(
                        action => {
                        expect(action.length).toBe(1);
                        expect(action[0]).toEqual(user);
                        done();
                    }
                )
            });

            it('has a selected user to delete', (done)=>{
                s.selectedUser.subscribe(
                        action => {
                        expect(action).toEqual(user);
                        done();
                    }
                )
            });

            describe('::deleteUser', () => {
                var service;
                var conn;

                beforeEach((done) => {
                    mb.connections.subscribe((c) => { conn = c } );
                    service = s;
                    service.usersUrl = service.configService.getConfig().usersEndpoint; //'?scenario=multipleResults&scope=success';
                    let user: IUser = {
                        userName: 'User 123',
                        email: 'foo@bar.com',
                        userID: 1,
                        organization_ID: 0,
                        tenant_ID: 0,
                        givenName: 'Test GivenName',
                        surname: 'Smith',
                        active: true,
                    };
                    service.deleteUser(user, done);
                });

                it('Calls api endpoint to delete a user', () => {
                    expect(conn.request.method).toBe(RequestMethod.Delete);
                });

                it('removes the user from the user list', (done) => {
                    service.users.subscribe(
                            action => {
                            expect(action.length).toBe(0);
                            done();
                        }
                    )
                });

                it('unselects the selected user', (done) => {
                    service.selectedUser.subscribe(
                            action => {
                            expect(action).toBe(null);
                            done();
                        }
                    )
                });

                it('sets the deleting loading to not loading', (done) => {
                    service.deletingUser.subscribe(
                            action => {
                            expect(action).toBe(Loading.NotLoading);
                            done();
                        }
                    );
                });
            });
        });
    });
});

