import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { APIKeysComponent } from './apiKeys.component';
import { IAPIKeys, APIKeysService } from './apiKeys';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockAPIKeysService {
    apiKeysUrl: string = 'localhost:8080/apiKeys';

    getApiKeys(): Observable<IAPIKeys[]> {
        return Observable.of(<IAPIKeys[]>[
            {
                'apiKeyID': 1,
                'apiKeyValue': 'agadw^&#224ag#$',
                'effectiveFrom': 7262016,
                'effectiveTo': 912016,
                'type': 'Auth',
                'description': 'Sample key for auth'
            }
        ]);
    }

    addApiKey (key: IAPIKeys): Observable<IAPIKeys> {
        return Observable.of(key);
    }

    updateApiKey (key: IAPIKeys): Observable<IAPIKeys> {
        return Observable.of(key);
    }

    deleteApiKey (key: IAPIKeys): Observable<IAPIKeys> {
        return Observable.of(key);
    }
}

describe('APIKeysComponent::', () => {

    beforeEach(() => {
        addProviders([
            APIKeysComponent,
            provide(APIKeysService, {useClass: MockAPIKeysService})
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([APIKeysComponent], (component:APIKeysComponent) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
                component.ngOnInit()
            });


            it('should instantiate by injection', () => {
                expect(component).toEqual(jasmine.any(APIKeysComponent));
            });

        });
    });
});