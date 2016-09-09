import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { SiteDetailContainer } from '../containers/site-detail.container';
import { ISite, AllSitesService } from '../../sites-all';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockAllSitesService {
    siteUrl: string = 'localhost:8080/sites';

    getSites(): Observable<ISite[]> {
        return Observable.of(<ISite[]>[
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

    addSite (site: ISite): Observable<ISite> {
        return Observable.of(site);
    }

    updateSite (site: ISite): Observable<ISite> {
        return Observable.of(site);
    }

    deleteSite (site: ISite): Observable<ISite> {
        return Observable.of(site);
    }
}

describe('SiteDetailContainer::', () => {

    beforeEach(() => {
        addProviders([
            SiteDetailContainer,
            provide(AllSitesService, {useClass: MockAllSitesService})
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([SiteDetailContainer], (component:SiteDetailContainer) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
                component.ngOnInit()
            });


            it('should instantiate by injection', () => {
                expect(component).toEqual(jasmine.any(SiteDetailContainer));
            });

            it('should have a site', () => {
              expect(component.site).toBeDefined();
            })

        });
    });
});