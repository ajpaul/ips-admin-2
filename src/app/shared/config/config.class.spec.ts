import {
    addProviders,
    inject
} from '@angular/core/testing';


import { Config } from './';
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

    it('should be able to set and read usersEndpoint', () => {
        var config = new Config();
        var usersEndpointValue = "/blah/blah";
        config.usersEndpoint = usersEndpointValue;
        var usersEndpointActualValue = config.usersEndpoint;
        expect(usersEndpointActualValue).toEqual(usersEndpointValue);
    });

    it('should be able to set and read orgUsersEndpoint', () => {
        var config = new Config();
        var orgUsersEndpointValue = "/blah/blah";
        config.orgUsersEndpoint = orgUsersEndpointValue;
        var orgUsersEndpointActualValue = config.orgUsersEndpoint;
        expect(orgUsersEndpointActualValue).toEqual(orgUsersEndpointValue);
    });

});