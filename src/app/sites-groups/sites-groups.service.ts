import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ISiteGroups } from './sites-groups.interface';

@Injectable()
export class SiteGroupsService{
    constructor(private http : Http){}

    siteUrl: string = 'http://localhost:8080/siteGroups';

    getSiteGroups(): Observable<ISiteGroups[]> {
        return this.http.get(this.siteUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addSiteGroup (siteGroup: ISiteGroups): Observable<ISiteGroups> {
        let body = JSON.stringify(siteGroup);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.siteUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateSiteGroup (siteGroup: ISiteGroups): Observable<ISiteGroups> {
        let body = JSON.stringify(siteGroup);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.siteUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteSiteGroup (siteGroup: ISiteGroups): Observable<ISiteGroups> {
        let body = JSON.stringify(siteGroup);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.siteUrl+'/'+siteGroup.siteGroupID, options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}