import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { GroupDetails } from './group-details.component';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('GroupDetails::', () => {

    beforeEach(() => {
        addProviders([
            GroupDetails
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([GroupDetails], (component:GroupDetails) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
            });

            it('should instantiate by injection', () => {
                expect(component).toEqual(jasmine.any(GroupDetails));
            });

        });
    });
});