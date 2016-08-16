import { Store, Observable, Injectable, Http, Headers, RequestOptions, Response, AppStore, IUser, ADD_USERS, DELETE_USER } from './users';

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };



@Injectable()
export class UsersService{

    userUrl: string = 'localhost:8080/users';
    users: Observable<Array<IUser>>;

    constructor(private http : Http, private store: Store<AppStore>) {
        this.users = store.select<Array<IUser>>('UsersReducer');
    }

    getUsers() {
        return this.http.get(this.userUrl)
            .map(this.extractData)
            .map(payload => ({type: ADD_USERS, payload}))
            .subscribe(
                action => this.store.dispatch(action),
                err => this.handleError(err)
            );
    }

    addUsers (user: IUser): Observable<IUser> {
        //TODO: Add store code
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.userUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateUsers (user: IUser): Observable<IUser> {
        //TODO: Add store code
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.userUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteUser (user: IUser)
    {
        let options = new RequestOptions(HEADER);

        return this.http.delete(this.userUrl+'/'+user.displayName, options)
            .map(this.extractData)
            .subscribe(
                action => this.store.dispatch({ type: DELETE_USER, payload: user }),
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