import { LightsReducer, Observable } from './lights';

describe('LightsReducer::', ()=> {

    it('returns and empty array by default', ()=>{
        let defaultState = LightsReducer(undefined, {type: 'random', payload: {}});
        expect(defaultState).toEqual([]);
    })

    it('ADD_LIGHTS adds the provided payload', ()=>{
        let addItem = LightsReducer(undefined, {type: 'ADD_LIGHTS', payload: 'payload'});
        expect(addItem).toEqual('payload');
    })

    it('DELETE_LIGHT removes the provided payload', ()=>{
        let removeItem = LightsReducer([{displayName: 'random'},{displayName: 'payload'}], {type: 'DELETE_LIGHT', payload: {displayName:'payload'}});
        expect(removeItem).toEqual([{displayName:'random'}]);
    })


});

