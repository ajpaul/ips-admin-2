import { UsersReducer, SelectedUserReducer } from './users';

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

describe('UsersReducer::', ()=> {
    it('returns the payload', ()=>{
        let defaultState = SelectedUserReducer(undefined, {type: 'SELECT_USER', payload: {}});
        expect(defaultState).toEqual({});
    });
});