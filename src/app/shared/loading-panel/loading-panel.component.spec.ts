import {
    addProviders,
    inject
} from '@angular/core/testing';

import { LoadingPanelComponent } from './loading-panel.component';
import { Loading } from '../loading-list';

describe('LoadingPanelComponent::', () => {

    beforeEach(() => {
        addProviders([LoadingPanelComponent]);
    });

    it('should instantiate by injection', inject([LoadingPanelComponent], (component: LoadingPanelComponent) => {
        expect(component).toEqual(jasmine.any(LoadingPanelComponent));
    }));

    it('should return true when loading error occurs', inject([LoadingPanelComponent], (component: LoadingPanelComponent) => {
        component.loadingStatus = Loading.Error;
        var iserr = component.isError();
        expect(iserr).toEqual(true);
    }));

    it('should emit refresh when refresh clicked', inject([LoadingPanelComponent], (component: LoadingPanelComponent) => {
        spyOn(component.refresh, 'emit');
        component.refreshClick();
        expect(component.refresh.emit).toHaveBeenCalled();
    }));
});