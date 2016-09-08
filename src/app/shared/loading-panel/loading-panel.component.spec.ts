import {
    addProviders,
    inject
} from '@angular/core/testing';

import { LoadingPanelComponent } from './loading-panel.component';

describe('LoadingPanelComponent::', () => {

    beforeEach(() => {
        addProviders([LoadingPanelComponent]);
    });

    it('should instantiate by injection', inject([LoadingPanelComponent], (component: LoadingPanelComponent) => {
        expect(component).toEqual(jasmine.any(LoadingPanelComponent));
    }));
});