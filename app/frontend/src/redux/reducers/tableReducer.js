const initialState = {
    loading: false,
    table: [],
    console: ''
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TABLE_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'FETCH_TABLE_SUCCESS':
            return {
                ...state,
                loading: false,
                table: action.payload,
                error: '',
            };

        case 'FETCH_TABLE_FAILURE':
            return {
                ...state,
                loading: false,
                table: [],
                error: action.payload,
            }
        
        default:
            return state;
    }
}