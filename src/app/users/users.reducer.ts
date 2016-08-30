/**
 * Created by sxd15 on 8/10/2016.
 */

import { IUser } from './users.interface'; 

export const ADD_USERS = 'ADD_USERS';
export const DELETE_USER = 'DELETE_USER';
export const CREATE_USERS = 'CREATE_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';
export const ADD_ERROR_USERS = 'ADD_ERROR_USERS';
export const REMOVE_ERROR_USERS = 'REMOVE_ERROR_USERS';
export const CLEAR_ERRORS_USERS = 'CLEAR_ERRORS_USERS';
export const SELECT_USER = 'SELECT_USER';
export const REQUEST_USER = 'REQUEST_USER';

export const RECEIVE_USER = 'RECEIVE_USER';
export const UsersReducer = (state: IUser[] = [], {type, payload}) => {
    switch (type) {
        case ADD_USERS:
            return payload;
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

export const SelectedUserReducer = (state: any = null, {type, payload}) => {
    switch (type) {
        case SELECT_USER:
            return payload;
        default:
            return state;
    }
};

export const LoadingUserReducer = (state: boolean = true, {type, payload}) => {
    switch (type) {
        case REQUEST_USER:
            return true;
        case RECEIVE_USER:
            return false;
        default:
            return state;
    }
};