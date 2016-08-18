import {
    addProviders,
    inject
} from '@angular/core/testing';

import { UsersList } from './users.list';

describe('UsersList::', () => {

    beforeEach(() => {
        addProviders([UsersList]);
    });

    it('should instantiate by injection', inject([UsersList], (component: UsersList) => {
        expect(component).toEqual(jasmine.any(UsersList));
    }));
});