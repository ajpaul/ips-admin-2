/**
 * Created by sxd15 on 8/10/2016.
 */
export const ADD_USERS = 'ADD_USERS';
export const DELETE_USER = 'DELETE_USER';
export const CREATE_USER = 'CREATE_USER';
export const SELECT_USER = 'SELECT_USER';

export const UsersReducer = (state: any = [], {type, payload}) => {
    switch (type) {
        case ADD_USERS:
            return payload;
        case DELETE_USER:
            return state.filter(item => {
                return item.displayName !== payload.displayName;
            });
        case CREATE_USER:
            return [...state, payload];
        default:
            return state;
    }
};

export const SelectedUserReducer = (state: any = null, {type, payload}) => {
    switch (type) {
        case SELECT_USER:
            return payload;
        default:
            return state;
    }
};