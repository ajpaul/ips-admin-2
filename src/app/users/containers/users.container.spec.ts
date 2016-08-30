import {
    addProviders,
    inject,
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { IUser, UsersService, UsersReducer } from '../users';
import { UsersContainer } from './users.container';
import { ConfigService } from '../../shared/config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockUsersService {
    usersEndpoint: string = '/api/user';
    orgUsersEndpoint: string = '/api/user/orgID';
    userUrl: string = this.usersEndpoint;
    orgUsersUrl: string = this.orgUsersEndpoint;
    users: Observable<Array<IUser>> = Observable.of(
        [<IUser>
        {
            userName: 'User 33',
            email: '',
            userID: 0,
            organization_ID: 0,
            tenant_ID: 0,
            givenName: 'Test GivenName',
            surname: 'Smith',
            active: true,
        }
    ]);
    selectedUser: Observable<IUser> = Observable.of(
        <IUser>
        {
            userName: 'User 33',
            email: '',
            userID: 0,
            organization_ID: 0,
            tenant_ID: 0,
            givenName: 'Test GivenName',
            surname: 'Smith',
            active: true, 
        }
    );
    userErrors: Observable<string[]> = Observable.of(['']);
    loadingUser: Observable<boolean> = Observable.of(false);

    getUsers(organization_ID: number = 0, onComplete?) {
        this.users = Observable.of(
            [<IUser>
                {
                    userName: 'User 33',
                    email: '',
                    userID: 0,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                },
                <IUser>{
                    userName: 'User 44',
                    email: '',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                }]
        );
    }
    createUsers (users: IUser[]) {
    }
    createUser (user: IUser) {
    }
    updateUsers (user: IUser[]) {
    }
    updateUser (user: IUser) {
    }
    deleteError(index: number) {
    }
    clearErrors() {
    }
    selectUser (user: IUser) {
    }
    deleteUser (user: IUser){
    }
    resetUser () {
    }
}

describe('UsersContainer::', () => {

    beforeEach(() => {
        addProviders([
            ConfigService,
            provide(UsersService, {useClass: MockUsersService}),
            UsersContainer
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([UsersContainer], (component: UsersContainer) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
            });

            it('should instantiate with injection', () => {
                expect(component).toEqual(jasmine.any(UsersContainer));
            });

            it('should have users', (done) => {
                component.ngOnInit();
                component.users.subscribe(
                        action => {
                        expect(action.length).toBeGreaterThan(0);
                        let user:IUser = {
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
});