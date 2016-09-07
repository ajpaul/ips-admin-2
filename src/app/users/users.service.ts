import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { IUser, ADD_USERS, DELETE_USER, CREATE_USERS, SELECT_USER, UPDATE_USERS, ADD_ERROR_USERS, REMOVE_ERROR_USERS, REQUEST_USER, RECEIVE_USER, CLEAR_ERRORS_USERS  } from './users';
import { ConfigService, Config } from '../shared/config/config';

const REQUEST = {
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: ''
};

@Injectable()
export class UsersService{

    usersUrl: string;
    orgUsersUrl: string;
    users: Observable<Array<IUser>>;
    selectedUser: Observable<IUser>;
    userErrors: Observable<string[]>;
    loadingUser: Observable<boolean>;
    selectedOrg: Observable<number>;
    organizationId: number = 0;

    constructor(private http : Http, private store: Store<AppStore>,  private configService: ConfigService) {
        this.initialize();
    }

    initialize() {
        this.users = this.store.select<Array<IUser>>('UsersReducer');
        this.selectedUser = this.store.select<IUser>('SelectedUserReducer');
        this.userErrors = this.store.select<string[]>('UserErrorsReducer');
        this.loadingUser = this.store.select<boolean>('LoadingUserReducer');
        this.selectedOrg = this.store.select<number>('SelectedOrgReducer');
        this.selectedOrg.subscribe((id) => {
            this.organizationId = id;
            this.buildUrls();
        })
        this.buildUrls();
    }

    buildUrls() {
        let config = this.configService.getConfig();
        this.usersUrl = config.apiRoot + config.usersEndpoint;
        this.orgUsersUrl = config.apiRoot + config.orgUsersEndpoint + this.organizationId.toString();
    }

    getUsers(onComplete?) {
        onComplete = onComplete || (()=>{});
        let options = new RequestOptions(REQUEST);
        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        return this.http.get(this.orgUsersUrl, options)
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
        let options = new RequestOptions(REQUEST);

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        //assumption here is that we get back the properly formed user from the put
        //the returned object is what will get added into the store
        return this.http.put(this.usersUrl, body, options)
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
        let options = new RequestOptions(REQUEST);
        options.body = '';

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        return this.http.put(this.usersUrl, body, options)
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
        this.store.dispatch({ type: REMOVE_ERROR_USERS, payload: index});
    }

    clearErrors() {
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
    }

    selectUser (user: IUser) {
        this.store.dispatch({type: SELECT_USER, payload: user});
    }

    deleteUser (user: IUser) {
        let options = new RequestOptions(REQUEST);
        // dispatch an action to initiate the loading
        this.store.dispatch({ type: REQUEST_USER });
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        return this.http.delete(this.usersUrl+'/'+user.userID, options)
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
            organization_ID: this.organizationId,
            tenant_ID: this.configService.getConfig().tenantId,
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
        this.store.dispatch({ type: ADD_ERROR_USERS, payload: errMsg });
        return Observable.throw(errMsg);
    }
}