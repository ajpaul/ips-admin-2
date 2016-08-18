import {
    addProviders,
    inject
} from '@angular/core/testing';

import { DeploymentComponent } from './deployment.component';

describe('DeploymentComponent::', () => {

    beforeEach(() => {
        addProviders([DeploymentComponent]);
    });

    it('should instantiate by injection', inject([DeploymentComponent], (component: DeploymentComponent) => {
        expect(component).toEqual(jasmine.any(DeploymentComponent));
    }));

});