import { UsersReducer, SelectedUserReducer, LoadingUserReducer, UserErrorsReducer, IUser, ADD_USERS, DELETE_USER } from './users';

describe('UsersReducer::', ()=> {
    var makeDummyUser = ({ id=0 }: { id: number }): IUser => {
        return {
            userName: 'User 33',
            email: '',
            userID: id,
            organization_ID: 0,
            tenant_ID: 0,
            givenName: 'Test GivenName',
            surname: 'Smith',
            active: true, 
        };
    }
    it('returns and empty array by default', ()=>{
        let defaultState = UsersReducer(undefined, {type: 'random', payload: {}});
        expect(defaultState).toEqual([]);
    });

    it('ADD_USERS adds the provided payload', ()=>{
        let dummyUsers = [
            makeDummyUser({ id: 0 }),
            makeDummyUser({ id: 1 }),
            makeDummyUser({ id: 2 }),
        ];
        let addItem = UsersReducer(undefined, {type: ADD_USERS, payload: dummyUsers});
        expect(addItem).toEqual(dummyUsers);
    });

    it('DELETE_USER removes the provided payload', () => {
        let initialUsers = [
            makeDummyUser({ id: 0 }),
            makeDummyUser({ id: 1 }),
            makeDummyUser({ id: 2 }),
        ];
        let removeItem = UsersReducer(initialUsers, { type: DELETE_USER, payload: makeDummyUser({ id: 1 }) });
        expect(removeItem).not.toEqual(initialUsers);
        expect(removeItem).toEqual(initialUsers.filter((user: IUser) => user.userID !== 1));
    });


});

describe('SelectedUserReducer::', ()=> {
    it('returns the payload', ()=>{
        let defaultState = SelectedUserReducer(undefined, {type: 'SELECT_USER', payload: {}});
        expect(defaultState).toEqual({});
    });
});

describe('LoadingUserReducer::', ()=> {
    it('returns false by default', ()=>{
        let defaultState = LoadingUserReducer(undefined, {type: 'random', payload: null });
        expect(defaultState).toEqual(false);
    });

    it('REQUEST_USER changes store to true', ()=>{
        let loadingItem = LoadingUserReducer(undefined, {type: 'REQUEST_USER', payload: null });
        expect(loadingItem).toEqual(true);
    });

    it('RECEIVE_USER changes store to false', ()=>{
        let loadingItem = LoadingUserReducer(undefined, {type: 'RECEIVE_USER', payload: null });
        expect(loadingItem).toEqual(false);
    });        
});

describe('UserErrorsReducer::', ()=> {
    it('returns empty array by default', ()=>{
        let defaultState = UserErrorsReducer(undefined, {type: 'random', payload: null });
        expect(defaultState).toEqual([]);
    });

    it('ADD_ERROR adds error to array', ()=>{
        let errorStore = UserErrorsReducer(undefined, {type: 'ADD_ERROR', payload: 'some error' });
        expect(errorStore).toEqual(['some error']);
    });

    it('REMOVE_ERROR removes error', ()=>{
        let errorStore = UserErrorsReducer(['some error'], {type: 'REMOVE_ERROR', payload: 0 });
        expect(errorStore).toEqual([]);
    });        
});

