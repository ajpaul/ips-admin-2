import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ISite } from '../sites-all/sites-all.interface';

@Injectable()
export class AllSitesService{
    constructor(private http : Http){}

    siteUrl: string = 'http://localhost:8080/sites';

    getSites(): Observable<ISite[]> {
        return this.http.get(this.siteUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addSite (site: ISite): Observable<ISite> {
        let body = JSON.stringify(site);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.siteUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateSite (site: ISite): Observable<ISite> {
        let body = JSON.stringify(site);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.siteUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteSite (site: ISite): Observable<ISite> {
        let body = JSON.stringify(site);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.siteUrl+'/'+site.siteId, options)
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
