import { UsersReducer, SelectedUserReducer, LoadingUserReducer, UserErrorsReducer } from './users';

describe('UsersReducer::', ()=> {

    it('returns and empty array by default', ()=>{
        let defaultState = UsersReducer(undefined, {type: 'random', payload: {}});
        expect(defaultState).toEqual([]);
    });

    it('ADD_USERS adds the provided payload', ()=>{
        let addItem = UsersReducer(undefined, {type: 'ADD_USERS', payload: 'payload'});
        expect(addItem).toEqual('payload');
    });

    it('DELETE_USER removes the provided payload', ()=>{
        let removeItem = UsersReducer([{displayName: 'random'},{displayName: 'payload'}], {type: 'DELETE_USER', payload: {displayName:'payload'}});
        expect(removeItem).toEqual([{displayName:'random'}]);
    })


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

