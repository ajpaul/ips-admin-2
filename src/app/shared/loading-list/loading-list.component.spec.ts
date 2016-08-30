import {
    addProviders,
    inject
} from '@angular/core/testing';

import { LoadingListComponent } from './loading-list.component';

describe('LoadingListComponent::', () => {

    beforeEach(() => {
        addProviders([LoadingListComponent]);
    });

    it('should instantiate by injection', inject([LoadingListComponent], (component: LoadingListComponent) => {
        expect(component).toEqual(jasmine.any(LoadingListComponent));
    }));
});