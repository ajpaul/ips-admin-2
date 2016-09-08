/**
 * Created by sxd15 on 8/10/2016.
 */

import { IUser } from './users.interface';
import { Loading } from '../shared/loading-list';

export const ADD_USERS = 'ADD_USERS';
export const CLEAR_USERS = 'CLEAR_USERS';
export const DELETE_USER = 'DELETE_USER';
export const CREATE_USERS = 'CREATE_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';
export const ADD_ERROR_USERS = 'ADD_ERROR_USERS';
export const REMOVE_ERROR_USERS = 'REMOVE_ERROR_USERS';
export const CLEAR_ERRORS_USERS = 'CLEAR_ERRORS_USERS';
export const SELECT_USER = 'SELECT_USER';
export const CLEAR_SELECTED_USER = 'CLEAR_SELECTED_USER';

export const SET_USERS_NOT_LOADING = 'SET_USERS_NOT_LOADING';
export const SET_USERS_LOADING = 'SET_USERS_LOADING';
export const SET_USERS_LOADING_ERROR = 'SET_USERS_LOADING_ERROR';


export const SET_USERS_NOT_DELETING = 'SET_USERS_NOT_DELETING';
export const SET_USERS_DELETING = 'SET_USERS_DELETING';
export const SET_USERS_DELETING_ERROR = 'SET_USERS_DELETING_ERROR';

export const UsersReducer = (state: IUser[] = [], {type, payload}) => {
    switch (type) {
        case ADD_USERS:
            return payload;
        case CLEAR_USERS:
            return [];
        case DELETE_USER:
            return state.filter((item: IUser) => {
                return item.userID !== payload.userID;
            });
        case CREATE_USERS:
            return [...state, ...payload];
        case UPDATE_USERS:
            return state.map((user: IUser) => {
                var userToUpdate: IUser;
                for(var i = 0; i < payload.length; i++) {
                    userToUpdate = payload[i];
                    if (userToUpdate.userID === user.userID) {
                        return userToUpdate;
                    }
                }
                return user;
            });
        default:
            return state;
    }
};

export const UserErrorsReducer = (state: string[] = [], {type, payload}) => {
    switch (type) {
        case ADD_ERROR_USERS:
            return [...state, payload];
        case REMOVE_ERROR_USERS:
            return state.filter((val, i) => {
                return i !== payload;
            });
        case CLEAR_ERRORS_USERS:
            return [];
        default:
            return state;
    }
}

export const SelectedUserReducer = (state: IUser = null, {type, payload}) => {
    switch (type) {
        case SELECT_USER:
            return payload;
        case CLEAR_SELECTED_USER:
            return null;
        default:
            return state;
    }
};

export const LoadingUserReducer = (state: Loading = Loading.NotLoading, {type, payload}): Loading => {
    switch (type) {
        case SET_USERS_NOT_LOADING:
            return Loading.NotLoading;
        case SET_USERS_LOADING:
            return Loading.Loading;
        case SET_USERS_LOADING_ERROR:
            return Loading.Error;
        default:
            return state;
    }
};

export const DeletingUserReducer = (state: Loading = Loading.NotLoading, {type, payload}): Loading => {
    switch (type) {
        case SET_USERS_NOT_DELETING:
            return Loading.NotLoading;
        case SET_USERS_DELETING:
            return Loading.Loading;
        case SET_USERS_DELETING_ERROR:
            return Loading.Error;
        default:
            return state;
    }
};