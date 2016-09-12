import {
    addProviders,
    inject
} from '@angular/core/testing';

import { UsersMessages } from './users-messages.component';

describe('UsersMessages::', () => {

    beforeEach(() => {
        addProviders([UsersMessages]);
    });

    it('should instantiate by injection', inject([UsersMessages], (component: UsersMessages) => {
        expect(component).toEqual(jasmine.any(UsersMessages));
    }));

    it('should emit create when create button clicked', inject([UsersMessages], (component: UsersMessages) => {
        spyOn(component.create, 'emit');
        component.createUserClick();
        expect(component.create.emit).toHaveBeenCalled();
    }));
});