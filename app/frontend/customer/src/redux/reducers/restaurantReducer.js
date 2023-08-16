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
            //console.log('Error:', action.payload);
            return {
                ...state,
                loading: false,
                restaurant: [],
                error: action.payload,
            }

        case 'SET_RESTAURANT_ID':
            return {
                ...state,
                restaurantId: action.payload
            };

        case 'SET_TABLE_NO':
            return {
                ...state,
                tableNo: action.payload
            };

        case 'SET_CURRENT_CATEGORY':
            return {
                ...state,
                currentCategoryId: action.payload
            };
        
        default:
            return state;
    }
}
