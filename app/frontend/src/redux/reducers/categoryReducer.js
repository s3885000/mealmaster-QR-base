const initialState = {
    loading: false,
    category: [],
    console: ''
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CATEGORY_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'FETCH_CATEGORY_SUCCESS':
            return {
                ...state,
                loading: false,
                category: action.payload,
                error: '',
            };

        case 'FETCH_CATEGORY_FAILURE':
            return {
                ...state,
                loading: false,
                category: [],
                error: action.payload,
            }
        
        default:
            return state;
    }
}