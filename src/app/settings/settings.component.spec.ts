import {
    addProviders,
    inject
} from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

describe('SettingsComponent::', () => {

    beforeEach(() => {
        addProviders([SettingsComponent, SidebarComponent]);
    });

    it('should instantiate by injection', inject([SettingsComponent], (component: SettingsComponent) => {
        expect(component).toEqual(jasmine.any(SettingsComponent));
    }));

    it('should have sidebarButtons', inject([SettingsComponent], (component: SettingsComponent) => {
        expect(component.sidebarButtons.length).toBeGreaterThan(0);
    }));
});