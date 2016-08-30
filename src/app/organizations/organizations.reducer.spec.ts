import { SelectedOrgReducer, ORG_REDUCER_ACTIONS } from './organizations';

describe('OrganizationReducer::', ()=> {

    it('returns 0 by default', ()=>{
        let defaultState = SelectedOrgReducer(undefined, {type: 'random', payload: {}});
        expect(defaultState).toEqual(0);
    });

    it('SELECT_ORGANIZATION sets provided payload', ()=>{
        let dummyId: number = 1;
        let addItem = SelectedOrgReducer(undefined, {type: ORG_REDUCER_ACTIONS.SELECT_ORG, payload: dummyId});
        expect(addItem).toEqual(dummyId);
    });

});


