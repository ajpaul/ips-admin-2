
export const ORGANIZATION_REDUCER_ACTIONS = {
    SELECT_ORGANIZATION: 'SELECT_ORGANIZATION'
};

export const SelectedOrganizationReducer = (state: number = 0, {type, payload}) => {
    switch (type) {
        case ORGANIZATION_REDUCER_ACTIONS.SELECT_ORGANIZATION:
            return payload;
        default:
            return state;
    }
};