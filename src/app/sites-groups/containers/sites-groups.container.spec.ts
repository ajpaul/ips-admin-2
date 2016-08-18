import {
    addProviders,
    inject
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { SitesGroupsComponent } from './sites-groups.container';
import { ISiteGroups, SiteGroupsService } from '../sites-groups';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockSiteGroupsService {
    siteUrl: string = 'localhost:8080/siteGroups';

    getSiteGroups(): Observable<ISiteGroups[]> {
        return Observable.of(<ISiteGroups[]>[
            {
                'siteGroupID': 1,
                'organization_ID': 1,
                'siteGroupName': 'Group 1',
                'description': 'This is the first site group'
            }
        ]);
    }

    addSiteGroup (siteGroup: ISiteGroups): Observable<ISiteGroups> {
        return Observable.of(siteGroup);
    }

    updateSiteGroup (siteGroup: ISiteGroups): Observable<ISiteGroups> {
        return Observable.of(siteGroup);
    }

    deleteSiteGroup (siteGroup: ISiteGroups): Observable<ISiteGroups> {
        return Observable.of(siteGroup);
    }
}

describe('SitesFavoritesComponent::', () => {

    beforeEach(() => {
        addProviders([
            SitesGroupsComponent,
            provide(SiteGroupsService, {useClass: MockSiteGroupsService})
        ]);
    });

    describe('withProviders::', () => {
        var testComponent;
        beforeEach(inject([SitesGroupsComponent], (component:SitesGroupsComponent) => {
            testComponent = component;
        }));

        describe('instantiated', () => {
            var component;
            beforeEach(() => {
                component = testComponent;
                component.ngOnInit()
            });


            it('should instantiate by injection', () => {
                expect(component).toEqual(jasmine.any(SitesGroupsComponent));
            });

            it('should have sites', () => {
                expect(component.siteGroups.length).toBeGreaterThan(0);
            });

            it('should do something when clicked', () => {
                spyOn(window, 'alert');
                component.sitesGroupsClick(1);
                expect(alert).toHaveBeenCalled();
            });
        });
    });
});