
export const ORG_REDUCER_ACTIONS = {
    SELECT_ORG: 'SELECT_ORG'
};

export const SelectedOrgReducer = (state: number = 1, {type, payload}) => {
    switch (type) {
        case ORG_REDUCER_ACTIONS.SELECT_ORG:
            return payload;
        default:
            return state;
    }
};