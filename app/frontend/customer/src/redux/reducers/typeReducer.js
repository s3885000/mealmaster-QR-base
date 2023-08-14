const initialState = 'table_number';

export const typeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_TYPE':
            return action.payload;  // return action.payload directly here
        default:
            return state;
    }
}
