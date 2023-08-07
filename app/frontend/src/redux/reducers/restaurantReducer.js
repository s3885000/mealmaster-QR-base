const initialState = {
    loading: false,
    restaurant: [],
    categories: [],
    error: '',
    type: 'table_number',
    banner: null,
    logo: null,
}

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_RESTAURANT_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'FETCH_RESTAURANT_SUCCESS':
            return {
                ...state,
                loading: false,
                restaurant: action.payload.restaurant,
                table: action.payload.table,
                categories: action.payload.categories,
                banner: action.payload.banner,
                logo: action.payload.logo,
                error: '',
            };

        case 'FETCH_RESTAURANT_FAILURE':
            return {
                ...state,
                loading: false,
                restaurant: [],
                error: action.payload,
            }
        
        default:
            return state;
    }
}
