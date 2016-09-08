import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';
import { IUser } from './users.interface';
import { ADD_USERS, DELETE_USER, CREATE_USERS, SELECT_USER, UPDATE_USERS, ADD_ERROR_USERS, REMOVE_ERROR_USERS, CLEAR_ERRORS_USERS, SET_USERS_NOT_LOADING, SET_USERS_LOADING, SET_USERS_LOADING_ERROR, CLEAR_USERS, SET_USERS_DELETING, SET_USERS_DELETING_ERROR, SET_USERS_NOT_DELETING, CLEAR_SELECTED_USER } from './users.reducer';
import { ConfigService, Config } from '../shared/config/config';

const GETREQUEST = {
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: ''
};
const OTHERREQUEST = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService{

    usersUrl: string;
    orgUsersUrl: string;
    updateUserUrl: string;
    users: Observable<Array<IUser>>;
    selectedUser: Observable<IUser>;
    userErrors: Observable<string[]>;
    deletingUser: Observable<number>;
    loadingUser: Observable<number>;
    selectedOrg: Observable<number>;
    organizationId: number = 0;

    constructor(private http : Http, private store: Store<AppStore>,  private configService: ConfigService) {
        this.initialize();
    }

    initialize() {
        this.users = this.store.select<Array<IUser>>('UsersReducer');
        this.selectedUser = this.store.select<IUser>('SelectedUserReducer');
        this.userErrors = this.store.select<string[]>('UserErrorsReducer');
        this.loadingUser = this.store.select<number>('LoadingUserReducer');
        this.deletingUser = this.store.select<number>('DeletingUserReducer');
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
        this.updateUserUrl = config.apiRoot + config.usersEndpoint;
    }

    getUsers(onComplete?) {
        onComplete = onComplete || (()=>{});

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        this.store.dispatch({ type: SET_USERS_LOADING });
        this.store.dispatch({ type: CLEAR_USERS });
        return this.http.get(this.orgUsersUrl, new RequestOptions(GETREQUEST))
            .map(this.extractMultipleUsers)
            .subscribe(
                action => {
                    this.store.dispatch({type: ADD_USERS, payload: action});
                    if(action.length>0){
                        this.store.dispatch({type: SELECT_USER, payload: action[0]});
                    }
                },
                err => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: SET_USERS_LOADING_ERROR });
                    this.handleError(err)
                },
                () => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: SET_USERS_NOT_LOADING });
                    onComplete();
                }
            );
    }

    createUsers (users: IUser[], onComplete?) {
        onComplete = onComplete || (()=>{});

        let body = JSON.stringify(users);

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        //assumption here is that we get back the properly formed user from the put
        //the returned object is what will get added into the store
        return this.http.put(this.updateUserUrl, body, new RequestOptions(OTHERREQUEST))
            .map(this.extractMultipleUsers)
            .subscribe(
                action => {
                    this.store.dispatch({type: CREATE_USERS, payload: action});
                    if(action.length>0){
                        this.store.dispatch({type: SELECT_USER, payload: action[0]});
                    }
                },
                err => {
                    // dispatch action to say loading is done
                    this.handleError(err);
                },
                // dispatch action to say loading is done
                () => {
                    onComplete();
                }
        );
    }

    createUser (user: IUser) {
        return this.createUsers([ user ]);
    }

    updateUsers (users: IUser[], onComplete?) {
        onComplete = onComplete || (()=>{});

        let body = JSON.stringify(users);

        // dispatch an action to initiate the loading
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        return this.http.post(this.updateUserUrl, body, new RequestOptions(OTHERREQUEST))
            .map(this.extractMultipleUsers)
            .subscribe(
                action => {
                    this.store.dispatch({type: UPDATE_USERS, payload: action});
                    if (action.length > 0) {
                        this.store.dispatch({type: SELECT_USER, payload: action[0]});
                    }
                },
                err => {
                    // dispatch action to say loading is done
                    this.handleError(err)
                },
                () => {
                    // dispatch action to say loading is done
                    onComplete();
                }
            );
            // this.store.dispatch({ type: RECEIVE_USER })
    }

    updateUser (user: IUser) {
        return this.updateUsers([ user ]);
    }

    deleteError(index: number) {
        this.store.dispatch({ type: REMOVE_ERROR_USERS, payload: index });
    }

    clearErrors() {
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        this.store.dispatch({ type: SET_USERS_NOT_LOADING });
    }

    selectUser (user: IUser) {
        this.store.dispatch({type: SELECT_USER, payload: user});
        this.store.dispatch({type: SET_USERS_NOT_DELETING });
    }

    deleteUser (user: IUser) {
        // dispatch an action to initiate the loading
        this.store.dispatch({ type: CLEAR_ERRORS_USERS });
        this.store.dispatch({ type: SET_USERS_DELETING });
        return this.http.delete(this.usersUrl+'/'+user.userID, new RequestOptions(GETREQUEST))
            .map(this.extractSingleUser)
            .subscribe(
                action => {
                    this.store.dispatch({ type: DELETE_USER, payload: user })
                    this.store.dispatch({ type: SET_USERS_NOT_DELETING })
                    this.store.dispatch({ type: CLEAR_SELECTED_USER });
                },
                err => {
                    // dispatch action to say loading is done
                    this.store.dispatch({ type: SET_USERS_DELETING_ERROR });
                    this.handleError(err);
                },
                // dispatch action to say loading is done
                () => this.store.dispatch({ type: SET_USERS_NOT_DELETING })
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