import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { SitesFavoritesComponent } from './sites-favorites.container';
import { ISiteFavorites, SiteFavoritesService } from '../sites-favorites';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockSiteFavoritesService {
    siteUrl: string = 'localhost:8080/siteFavorites';

    getSiteFavorites(): Observable<ISiteFavorites[]> {
        return Observable.of(<ISiteFavorites[]>[
            {
                'siteId': 1,
                'siteName': 'Site 1',
                'city': 'Atlanta',
                'stateProvince': 'GA',
                'country': 'USA',
                'serviceStatus': 'ACTIVE',
                'timeZoneId': 1
            }
        ]);
    }

    addSiteFavorite (siteFavorite: ISiteFavorites): Observable<ISiteFavorites> {
        return Observable.of(siteFavorite);
    }

    updateSiteFavorite (siteFavorite: ISiteFavorites): Observable<ISiteFavorites> {
        return Observable.of(siteFavorite);
    }

    deleteSiteFavorite (siteFavorite: ISiteFavorites): Observable<ISiteFavorites> {
        return Observable.of(siteFavorite);
    }
}

describe('SitesFavoritesComponent::', () => {

    beforeEach(() => {
        addProviders([
            SitesFavoritesComponent,
            provide(SiteFavoritesService, {useClass: MockSiteFavoritesService})
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([SitesFavoritesComponent], (component:SitesFavoritesComponent) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
                component.ngOnInit()
            });


            it('should instantiate by injection', () => {
                expect(component).toEqual(jasmine.any(SitesFavoritesComponent));
            });

            it('should have sites', () => {
                expect(component.siteFavs.length).toBeGreaterThan(0);
            });

            it('should do something when clicked', () => {
                spyOn(window, 'alert');
                component.favoritesClick();
                expect(alert).toHaveBeenCalled();
            });
        });
    });
});