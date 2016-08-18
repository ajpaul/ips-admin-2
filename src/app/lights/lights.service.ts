import { Store, Observable, Injectable, Http, Headers, RequestOptions, Response, AppStore, ILight, ADD_LIGHTS, DELETE_LIGHT } from './lights';

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };



@Injectable()
export class LightsService{

    lightsUrl: string = 'localhost:8080/lights';
    lights: Observable<Array<ILight>>;

    constructor(private http : Http, private store: Store<AppStore>) {
        this.lights = store.select<Array<ILight>>('LightsReducer');
    }

    getLights(onComplete?) {
        onComplete = onComplete || (()=>{});
        return this.http.get(this.lightsUrl)
            .map(this.extractData)
            .map(payload => ({type: ADD_LIGHTS, payload}))
            .subscribe(
                action => this.store.dispatch(action),
                err => this.handleError(err),
                () => { onComplete() }
            );
    }

    addLight (light: ILight): Observable<ILight> {
        //TODO: Add store code
        let body = JSON.stringify(light);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.lightsUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateLight (light: ILight): Observable<ILight> {
        //TODO: Add store code
        let body = JSON.stringify(light);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.lightsUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteLight (light: ILight)
    {
        let options = new RequestOptions(HEADER);

        return this.http.delete(this.lightsUrl+'/'+light.luminaireTypeId, options)
            .map(this.extractData)
            .subscribe(
                action => this.store.dispatch({ type: DELETE_LIGHT, payload: light }),
                err => this.handleError(err)
            );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body ? body.data || { } : { };
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}