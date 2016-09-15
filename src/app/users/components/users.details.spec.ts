import {
    addProviders,
    inject
} from '@angular/core/testing';

import { UsersDetail } from './users.details';
import { IUser } from '../users.interface';

describe('UsersDetail::', () => {

    beforeEach(() => {
        addProviders([UsersDetail]);
    });

    it('should instantiate by injection', inject([UsersDetail], (component: UsersDetail) => {
        expect(component).toEqual(jasmine.any(UsersDetail));
    }));

    it('should emit cancelled when cancel button clicked', inject([UsersDetail], (component: UsersDetail) => {
        spyOn(component.cancelled, 'emit');
        component.cancel();
        expect(component.cancelled.emit).toHaveBeenCalled();
    }));

    it('should emit save when save button clicked', inject([UsersDetail], (component: UsersDetail) => {
        spyOn(component.save, 'emit');
        component.saveUser(null);
        expect(component.save.emit).toHaveBeenCalled();
    }));

    it('should emit delete when delete button clicked', inject([UsersDetail], (component: UsersDetail) => {
        spyOn(component.delete, 'emit');
        component.deleteUser();
        expect(component.delete.emit).toHaveBeenCalled();
    }));

    it('should indicate if it is an existing user', inject([UsersDetail], (component: UsersDetail) => {
        var is = component.isExistingUser();
        expect(is).toBeFalsy();
        component.selectedItem = <IUser>{
                userName: 'User 123',
                email: 'foo@bar.com',
                userID: null,
                organization_ID: 0,
                tenant_ID: 0,
                givenName: 'Test GivenName',
                surname: 'Smith',
                active: true,
            };
        var is = component.isExistingUser();
        expect(is).toBeFalsy();
        component.selectedItem.userID = 1;
        var is = component.isExistingUser();
        expect(is).toBeTruthy();
    }));
});