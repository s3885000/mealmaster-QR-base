const initialState = {
    loading: false,
    restaurant: [],
    error: '',
    type: 'table_number',
}

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_RESTAURANT_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'FETCH_RESTAURANT_SUCCESS':
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                restaurant: action.payload.restaurant,
                table: action.payload.table,
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
