/**
 * Created by sxd15 on 9/8/2016.
 */

import {
    addProviders,
    inject,
TestBed
} from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AuthRedirectComponent::', () => {

    // beforeEach(() => {
    //     addProviders([AuthRedirectComponent]);
    // });
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [AppComponent]});
    });

    // it('should instantiate by injection', inject([AuthRedirectComponent], (component: AuthRedirectComponent) => {
    //     expect(component).toEqual(jasmine.any(AuthRedirectComponent));
    // }));

    it ('should work', () => {
        let fixture = TestBed.createComponent(AppComponent);
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

});