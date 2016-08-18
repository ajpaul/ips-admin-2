import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { provideStore }	 	from '@ngrx/store';
import { ILight, LightsService, Observable, LightsReducer } from '../lights';
import { LightsContainer } from './lights.container';
import 'rxjs/add/observable/of';

class MockLightService {
    lightsUrl: string = '';
    lights: Observable<Array<ILight>> = Observable.of([<ILight>{
        'luminaireTypeId': 1,
        'organization_ID': 1,
        'displayName': 'Light 1',
        'exteriorWidth': 2,
        'exteriorLength': 2,
        'interiorWidth': 2,
        'interiorLength': 1
    }]);

    getLights(onComplete?) {
        this.lights = Observable.of(
            [<ILight>{
                'luminaireTypeId': 1,
                'organization_ID': 1,
                'displayName': 'Light 1',
                'exteriorWidth': 2,
                'exteriorLength': 2,
                'interiorWidth': 2,
                'interiorLength': 1
            },
            <ILight>{
                'luminaireTypeId': 2,
                'organization_ID': 1,
                'displayName': 'Light 2',
                'exteriorWidth': 4,
                'exteriorLength': 4,
                'interiorWidth': 4,
                'interiorLength': 1
            }]);
    }

    public addLight (light: ILight): Observable<ILight> {
        return Observable.of(<ILight>light);
    }
    public updateLight (light: ILight): Observable<ILight> {
        return Observable.of(<ILight>light);
    }
    public deleteLight(light: ILight) {

    }
}

describe('LightsContainer::', () => {

    beforeEach(() => {
        addProviders([
            provideStore({ LightsReducer }), //add a store
            provide(LightsService, {useClass: MockLightService}),
            LightsContainer
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([LightsContainer], (component: LightsContainer) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
            });

            it('should instantiate with injection', () => {
                expect(component).toEqual(jasmine.any(LightsContainer));
            });

            it('should have lights', (done) => {
                component.ngOnInit();
                component.lights.subscribe(
                        action => {
                        expect(action.length).toBeGreaterThan(0);
                        let lightType:ILight = {
                            'luminaireTypeId': 1,
                            'organization_ID': 1,
                            'displayName': 'Light 1',
                            'exteriorWidth': 2,
                            'exteriorLength': 2,
                            'interiorWidth': 2,
                            'interiorLength': 1
                        };
                        expect(typeof action).toBe(typeof lightType);
                        done();
                    },
                        err => {
                        expect(err).toBe(0);
                        done();
                    }
                );
            });

            it('should have columns', () => {
                expect(component.columns.length).toBeGreaterThan(0);
                expect(component.columns[0]).toEqual('Name')
            });

            it('should have filters values', () => {
                expect(component.filterValues.length).toBeGreaterThan(0);
                expect(component.filterValues[0]).toEqual('Filter');
            });
        });
    });
});