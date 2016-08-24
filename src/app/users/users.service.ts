import { Store, Observable, Injectable, Http, Headers, RequestOptions, Response, AppStore, IUser, ADD_USERS, DELETE_USER, CREATE_USER, SELECT_USER, ADD_ERROR, REMOVE_ERROR } from './users';
import { ConfigService } from '../shared/config/config';

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class UsersService{

    userUrl: string;
    userEndpoint: string = '/users';
    users: Observable<Array<IUser>>;
    selectedUser: Observable<IUser>;
    userErrors: Observable<any>;

    constructor(private http : Http, private store: Store<AppStore>,  private configService: ConfigService) {
        this.users = store.select<Array<IUser>>('UsersReducer');
        this.selectedUser = store.select<IUser>('SelectedUserReducer');
        this.userErrors = store.select<any>('UserErrorsReducer');
        this.userUrl = configService.getConfig().apiRoot + this.userEndpoint;
    }

    getUsers(onComplete?) {
        onComplete = onComplete || (()=>{});
        return this.http.get(this.userUrl)
            .map(this.extractData)
            .map(payload => ({type: ADD_USERS, payload}))
            .subscribe(
                action => this.store.dispatch(action),
                err => this.handleError(err),
                () => { onComplete() }
            );
    }

    createUser (user: IUser) {
        let body = JSON.stringify(user);
        let options = new RequestOptions(HEADER);

        //assumption here is that we get back the properly formed user from the put
        //the returned object is what will get added into the store
        return this.http.put(this.userUrl, body, options)
            .map(this.extractData)
            .map(payload => ({type: CREATE_USER, payload}))
            .subscribe(action => this.store.dispatch(action),
                err => this.handleError(err));
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

    deleteError(index: number) {
        this.store.dispatch({ type: REMOVE_ERROR, payload: index});
    }

    selectUser (user: IUser) {
        this.store.dispatch({type: SELECT_USER, payload: user});
    }

    deleteUser (user: IUser) {
        let options = new RequestOptions(HEADER);

        return this.http.delete(this.userUrl+'/'+user.displayName, options)
            .map(this.extractData)
            .subscribe(
                action => this.store.dispatch({ type: DELETE_USER, payload: user }),
                err => this.handleError(err)
            );
    }

    resetUser () {
        let emptyUser: IUser = {
            displayName: '',
            displayEmail: '',
            bookmarked: false
        };

        // :: NOTE ON ABOVE EMPTY OBJECT ::
        //yes, we could do this to make an empty object: let emptyUser = <IUser>{}
        //but you'll lose type safety as you will now get undefined in unexpected places,
        //and possibly runtime errors, when accessing modal.content and so on
        //(properties that the contract says will be there).

        this.selectUser(emptyUser);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body ? body.data || { } : { };
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        this.store.dispatch({ type: ADD_ERROR, payload: errMsg });
        return Observable.throw(errMsg);
    }
}