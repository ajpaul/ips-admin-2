import {
    addProviders,
    inject,
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { IUser, UsersService, UsersReducer } from '../';
import { UsersContainer } from './users.container';
import { ConfigService } from '../../shared/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockUsersService {
    usersUrl: string;
    orgUsersUrl: string;
    updateUserUrl: string;
    selectedOrg: Observable<number> = Observable.of(1);
    organizationId: number = 1;
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
    deletingUser: Observable<boolean> = Observable.of(false);

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
    clearSelectedUser () {
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
            let testuser: IUser;
            beforeEach(() => {
                component = testComponent;
                testuser = {
                    userName: 'User 123',
                    email: 'foo@bar.com',
                    userID: 1,
                    organization_ID: 0,
                    tenant_ID: 0,
                    givenName: 'Test GivenName',
                    surname: 'Smith',
                    active: true,
                };
            });

            it('should instantiate with injection', () => {
                expect(component).toEqual(jasmine.any(UsersContainer));
            });

            it('should have users', (done) => {
                component.ngOnInit();
                component.users$.subscribe(
                        action => {
                        expect(action.length).toBeGreaterThan(0);
                        expect(typeof action).toBe(typeof testuser);
                        expect(component.hasUsers).toBe(true);
                        done();
                    },
                        err => {
                        expect(err).toBe(0);
                        done();
                    }
                );
            });

            it('should use the UsersService to get users', ()=>{
                component.usersService = new MockUsersService();
                //have to override the injected usersService because it is a private property and you can't spyOn a private property
                spyOn(component.usersService, 'getUsers');
                component.getUsers();
                expect(component.usersService.getUsers).toHaveBeenCalled();
            });

            it('should use the UsersService to clear the selected user', ()=>{
                component.usersService = new MockUsersService();
                //have to override the injected usersService because it is a private property and you can't spyOn a private property
                spyOn(component.usersService, 'clearSelectedUser');
                component.clearSelectedUser();
                expect(component.usersService.clearSelectedUser).toHaveBeenCalled();
            });

            it('should use the UsersService to clear errors', ()=>{
                component.usersService = new MockUsersService();
                //have to override the injected usersService because it is a private property and you can't spyOn a private property
                spyOn(component.usersService, 'clearErrors');
                component.onClearError();
                expect(component.usersService.clearErrors).toHaveBeenCalled();
            });

            it('should use the UsersService to reset the user', ()=>{
                component.usersService = new MockUsersService();
                //have to override the injected usersService because it is a private property and you can't spyOn a private property
                spyOn(component.usersService, 'resetUser');
                component.resetItem();
                expect(component.usersService.resetUser).toHaveBeenCalled();
            });

            it('should use the UsersService to delete user', ()=>{
                component.usersService = new MockUsersService();
                //have to override the injected usersService because it is a private property and you can't spyOn a private property
                spyOn(component.usersService, 'deleteUser');
                component.deleteItem(testuser);
                expect(component.usersService.deleteUser).toHaveBeenCalled();
            });

            it('should use the UsersService to select a user', ()=>{
                component.usersService = new MockUsersService();
                //have to override the injected usersService because it is a private property and you can't spyOn a private property
                spyOn(component.usersService, 'selectUser');
                component.selectItem(testuser);
                expect(component.usersService.selectUser).toHaveBeenCalled();
            });

            it('should use the UsersService to save a user', ()=>{
                component.usersService = new MockUsersService();
                //have to override the injected usersService because it is a private property and you can't spyOn a private property
                spyOn(component.usersService, 'updateUser');
                component.saveItem(testuser);
                expect(component.usersService.updateUser).toHaveBeenCalled();

                testuser.userID = null;
                spyOn(component.usersService, 'createUser');
                component.saveItem(testuser);
                expect(component.usersService.createUser).toHaveBeenCalled();
            });
        });
    });
});