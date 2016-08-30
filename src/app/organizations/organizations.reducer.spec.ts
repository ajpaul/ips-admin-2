import { SelectedOrganizationReducer, ORGANIZATION_REDUCER_ACTIONS } from './organizations';

describe('OrganizationReducer::', ()=> {

    it('returns 0 by default', ()=>{
        let defaultState = SelectedOrganizationReducer(undefined, {type: 'random', payload: {}});
        expect(defaultState).toEqual(0);
    });

    it('SELECT_ORGANIZATION sets provided payload', ()=>{
        let dummyId: number = 1;
        let addItem = SelectedOrganizationReducer(undefined, {type: ORGANIZATION_REDUCER_ACTIONS.SELECT_ORGANIZATION, payload: dummyId});
        expect(addItem).toEqual(dummyId);
    });

});


