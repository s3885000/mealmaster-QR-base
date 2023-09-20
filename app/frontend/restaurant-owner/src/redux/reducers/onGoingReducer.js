import {
    FETCH_ONGOING_ORDERS_START,
    FETCH_ONGOING_ORDERS_SUCCESS,
    FETCH_ONGOING_ORDERS_FAILURE,
} from '../actions/onGoingActions';
  
const initialState = {
    onGoingOrders: [],
    loading: false,
    error: null
};

const onGoingReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_ONGOING_ORDERS_START:
            return {
                ...state,
                loading: true,
                error: null
            };
    
        case FETCH_ONGOING_ORDERS_SUCCESS:
            const sortedPayload = action.payload.sort((a, b) => {
                const timestampA = new Date(a.create_at).getTime();
                const timestampB = new Date(b.create_at).getTime();
                return timestampA - timestampB; // This will ensure the orders are sorted from older to newer
            });
            return {
                ...state,
                onGoingOrders: sortedPayload,
                loading: false
            };
            
        case FETCH_ONGOING_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                onGoingOrders: []
            };
        
        default:
            console.log('Unhandled action type:', action.type, 'with payload:', action.payload);
            return state;
    }
};
  
export default onGoingReducer;
