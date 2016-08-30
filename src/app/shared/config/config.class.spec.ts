import {
    addProviders,
    inject
} from '@angular/core/testing';


import { Config } from './config';
import 'rxjs/add/operator/catch';

describe('Config::', () => {

    beforeEach(() => {
        addProviders([
        ]);
    });

    it('should instantiate via new', () => {
        var config = new Config();
        expect(config).toBeTruthy();
    });

    it('should be able to set and read apiRoot', () => {
        var config = new Config();
        var apiRootValue = "http://localhost:1234";
        config.apiRoot = apiRootValue;
        var apiRootActualValue = config.apiRoot;
        expect(apiRootActualValue).toEqual(apiRootValue);
    });

});