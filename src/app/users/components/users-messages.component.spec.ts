import {
    addProviders,
    inject
} from '@angular/core/testing';

import { UsersMessages } from './users.messages';

describe('UsersMessages::', () => {

    beforeEach(() => {
        addProviders([UsersMessages]);
    });

    it('should instantiate by injection', inject([UsersMessages], (component: UsersMessages) => {
        expect(component).toEqual(jasmine.any(UsersMessages));
    }));
});