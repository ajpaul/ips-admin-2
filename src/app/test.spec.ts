/**
 * Created by sxd15 on 9/8/2016.
 */

import {
    addProviders,
    inject,
TestBed
} from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('TestSpec::', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [AppComponent]});
    });

    it ('should work', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

});