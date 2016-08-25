import { Store, Observable, Injectable, Http, Headers, RequestOptions, Response, AppStore, IUser } from './users';
import { ADD_USERS, DELETE_USER, CREATE_USERS, SELECT_USER, UPDATE_USERS, ADD_ERROR, REMOVE_ERROR, REQUEST_USER, RECEIVE_USER } from './users';
import { ConfigService, Config } from '../shared/config/config';

const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class UsersService{

    singleUserUrl: string;
    updateUsersUrl: string;
    multipleUsersUrl: string;
    singleUserEndpoint: string = '/api/user/${userID}';
    updateUsersEndpoint: string = '/api/user';
    multipleUsersEndpoint: string = '/api/user/orgID/{orgID}';
    users: Observable<Array<IUser>>;
    selectedUser: Observable<IUser>;
    userErrors: Observable<any>;
    loadingUser: Observable<boolean>;

    constructor(private http : Http, private store: Store<AppStore>,  private configService: ConfigService) {
        this.users = store.select<Array<IUser>>('UsersReducer');
        this.selectedUser = store.select<IUser>('SelectedUserReducer');
        this.userErrors = store.select<any>('UserErrorsReducer');
        this.loadingUser = store.select<boolean>('LoadingUserReducer');
        this.buildUrls(configService.getConfig());
    }

    buildUrls(config: Config) {
        this.singleUserUrl = config.apiRoot + this.singleUserEndpoint;
        this.updateUsersUrl = config.apiRoot + this.updateUsersEndpoint;
        this.multipleUsersUrl = config.apiRoot + this.multipleUsersEndpoint;
    }

    getUsers(onComplete?) {
        onComplete = onComplete || (()=>{});
        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        return this.http.get(this.multipleUsersUrl)
            .map(this.extractMultipleUsers)
            .map(payload => ({type: ADD_USERS, payload}))
            .subscribe(
                action => this.store.dispatch(action),
                err => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: RECEIVE_USER });
                    this.handleError(err)
                },
                () => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: RECEIVE_USER });
                    onComplete();
                }
            );
    }

    createUsers (users: IUser[]) {
        let body = JSON.stringify(users);
        let options = new RequestOptions(HEADER);

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        //assumption here is that we get back the properly formed user from the put
        //the returned object is what will get added into the store
        return this.http.put(this.updateUsersUrl, body, options)
            .map(this.extractMultipleUsers)
            .map(payload => ({type: CREATE_USERS, payload}))
            .subscribe(action => this.store.dispatch(action),
                err => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: RECEIVE_USER });                    
                    this.handleError(err);
                },
                // dispatch action to say loading is done
                () => this.store.dispatch({ type: RECEIVE_USER })
                );
    }

    createUser (user: IUser) {
        return this.createUsers([ user ]);
    }

    updateUsers (users: IUser[]) {
        let body = JSON.stringify(users);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        return this.http.put(this.updateUsersUrl, body, options)
            .map(this.extractMultipleUsers)
            .map(payload => ({type: UPDATE_USERS, payload}))
            .subscribe(
                action => this.store.dispatch(action),
                err => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: RECEIVE_USER });
                    this.handleError(err)
                },
                () => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: RECEIVE_USER });
                }
            );
            // this.store.dispatch({ type: RECEIVE_USER })
    }

    updateUser (user: IUser) {
        return this.updateUsers([ user ]);
    }

    deleteError(index: number) {
        this.store.dispatch({ type: REMOVE_ERROR, payload: index});
    }

    selectUser (user: IUser) {
        this.store.dispatch({type: SELECT_USER, payload: user});
    }

    deleteUser (user: IUser) {
        let options = new RequestOptions(HEADER);

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        return this.http.delete(this.userUrl+'/'+user.userID, options)
            .map(this.extractSingleUser)
            .subscribe(
                action => this.store.dispatch({ type: DELETE_USER, payload: user }),
                err => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: RECEIVE_USER });                    
                    this.handleError(err);
                },
                // dispatch action to say loading is done
                () => this.store.dispatch({ type: RECEIVE_USER })                
            );
    }

    resetUser () {
        let emptyUser: IUser = {
            userID: null,
            organization_ID: null,
            tenant_ID: null,
            userName: '',
            email: '',
            givenName: '',
            surname: '',
            active: false
        };

        // :: NOTE ON ABOVE EMPTY OBJECT ::
        //yes, we could do this to make an empty object: let emptyUser = <IUser>{}
        //but you'll lose type safety as you will now get undefined in unexpected places,
        //and possibly runtime errors, when accessing modal.content and so on
        //(properties that the contract says will be there).

        this.selectUser(emptyUser);
    }

    private extractMultipleUsers(res: Response) {
        let body = res.json();
        return body ? body.result || [] : [];
    }

    private extractSingleUser(res: Response) {
        let body = res.json();
        return body ? body || {} : {};
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        this.store.dispatch({ type: ADD_ERROR, payload: errMsg });
        return Observable.throw(errMsg);
    }
}