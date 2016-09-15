import {
    addProviders,
    inject
} from '@angular/core/testing';

import { UsersList } from './users.list';
import { IUser } from '../users.interface';

describe('UsersList::', () => {

    beforeEach(() => {
        addProviders([UsersList]);
    });

    it('should instantiate by injection', inject([UsersList], (component: UsersList) => {
        expect(component).toEqual(jasmine.any(UsersList));
    }));

    it('should indicate if it is Loading', inject([UsersList], (component: UsersList) => {
        component.loadingState = 'loading';
        var is = component.isLoading();
        expect(is).toBeTruthy();
        component.loadingState = 'notloading';
        var is = component.isLoading();
        expect(is).toBeFalsy();
    }));

    it('should indicate if it has results', inject([UsersList], (component: UsersList) => {
        component.loadingState = 'loading';
        var has = component.hasSomeResults();
        expect(has).toBeFalsy();
        component.items = [<IUser>{
            userName: 'User 123',
            email: 'foo@bar.com',
            userID: 1,
            organization_ID: 0,
            tenant_ID: 0,
            givenName: 'Test GivenName',
            surname: 'Smith',
            active: true,
        }];
        var has = component.hasSomeResults();
        expect(has).toBeFalsy();
        component.loadingState = 'notloading';
        var has = component.hasSomeResults();
        expect(has).toBeTruthy();
    }));
});