import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { IUser, UsersService, UsersReducer, Observable } from '../users';
import { UsersContainer } from './users.container';
import 'rxjs/add/observable/of';

class MockUsersService {
    userUrl: string = 'localhost:8080/users';
    users: Observable<Array<IUser>> = Observable.of(
        [<IUser>
        {
            'displayName': 'User 33',
            'displayEmail': '',
            'bookmarked': false
        }
    ]);

    getUsers(onComplete?) {
        this.users = Observable.of(
            [<IUser>
                {
                    'displayName': 'User 33',
                    'displayEmail': '',
                    'bookmarked': false
                },
                <IUser>{
                    'displayName': 'User 44',
                    'displayEmail': '',
                    'bookmarked': false
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