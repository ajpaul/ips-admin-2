import {
    addProviders,
    inject,
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { IUser, UsersService, UsersReducer, Observable } from '../users';
import { UsersContainer } from './users.container';
import { ConfigService } from '../../shared/config/config';
import 'rxjs/add/observable/of';

class MockUsersService {
    userUrl: string = 'http://localhost:8080/users';
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
    loadingUser: Observable<boolean> = Observable.of(false);    
    isLoading: boolean = false;

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

    getUsers(onComplete?) {
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

    createUser (user: IUser) {
    }
    updateUsers (user: IUser): Observable<IUser> {
        return Observable.of(<IUser>user);
    }
    deleteUser (user: IUser){
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