import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { GroupSitesComponent } from './group-sites.component';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('GroupSitesComponent::', () => {

    beforeEach(() => {
        addProviders([
            GroupSitesComponent
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([GroupSitesComponent], (component:GroupSitesComponent) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
            });

            it('should instantiate by injection', () => {
                expect(component).toEqual(jasmine.any(GroupSitesComponent));
            });

        });
    });
});