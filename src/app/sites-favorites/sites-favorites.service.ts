import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ISiteFavorites } from './sites-favorites.interface';

@Injectable()
export class SiteFavoritesService{
     constructor(private http : Http){}

     siteUrl: string = 'localhost:8080/siteFavorites';

    getSiteFavorites(): Observable<ISiteFavorites[]> {
        return this.http.get(this.siteUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addSiteFavorite (siteFavorite: ISiteFavorites): Observable<ISiteFavorites> {
        let body = JSON.stringify(siteFavorite);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.siteUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateSiteFavorite (siteFavorite: ISiteFavorites): Observable<ISiteFavorites> {
        let body = JSON.stringify(siteFavorite);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.siteUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteSiteFavorite (siteFavorite: ISiteFavorites): Observable<ISiteFavorites> {
        let body = JSON.stringify(siteFavorite);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.siteUrl+'/'+siteFavorite.siteId, options)
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