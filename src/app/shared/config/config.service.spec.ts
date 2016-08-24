import {
    addProviders,
    inject
} from '@angular/core/testing';


import { Config, ConfigService } from './config';
import 'rxjs/add/operator/catch';

describe('ConfigService::', () => {

    beforeEach(() => {
        addProviders([
            ConfigService
        ]);
    });

    it('should instantiate by injection', inject([ConfigService], (service: ConfigService) => {
        expect(service).toEqual(jasmine.any(ConfigService));
    }));

    it('should be able to return valid Config object', inject([ConfigService], (service: ConfigService) => {
        var config = service.getConfig();
        expect(config instanceof Config).toBeTruthy();
    }));    

});