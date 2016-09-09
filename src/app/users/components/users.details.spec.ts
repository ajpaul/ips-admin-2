import {
    addProviders,
    inject
} from '@angular/core/testing';

import { UsersDetail } from './users.details';

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
});