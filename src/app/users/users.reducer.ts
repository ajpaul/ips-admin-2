/**
 * Created by sxd15 on 8/10/2016.
 */
export const ADD_USERS = 'ADD_USERS';
export const DELETE_USER = 'DELETE_USER';
export const CREATE_USERS = 'CREATE_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';
export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';
export const SELECT_USER = 'SELECT_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export const UsersReducer = (state: any = [], {type, payload}) => {
    switch (type) {
        case ADD_USERS:
            return payload;
        case DELETE_USER:
            return state.filter(item => {
                return item.displayName !== payload.displayName;
            });
        case CREATE_USERS:
            return [...state, ...payload];
        case UPDATE_USERS:
            return state;
        default:
            return state;
    }
};

export const UserErrorsReducer = (state: string[] = [], {type, payload}) => {
    switch (type) {
        case ADD_ERROR:
            return [...state, payload];
        case REMOVE_ERROR:
            return state.filter((val, i) => {
                if (i === payload) {
                    return false;
                } else {
                    return true;
                }
            });
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

export const LoadingUserReducer = (state: boolean = false, {type, payload}) => {
    switch (type) {
        case REQUEST_USER:
            return true;
        case RECEIVE_USER:
            return false;
        default:
            return state;
    }
};