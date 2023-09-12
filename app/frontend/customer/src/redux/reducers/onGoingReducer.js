import {
    FETCH_ONGOING_ORDERS_START,
    FETCH_ONGOING_ORDERS_SUCCESS,
    FETCH_ONGOING_ORDERS_FAILURE,
    MARK_ORDER_AS_COMPLETED_START,
    MARK_ORDER_AS_COMPLETED_SUCCESS,
    MARK_ORDER_AS_COMPLETED_FAILURE,
    UPDATE_ORDER_STATUS,
} from '../actions/onGoingActions';
  
const initialState = {
    onGoingOrders: [],
    loading: false,
    error: null
};
  
  const onGoingReducer = (state = initialState, action) => {
    console.log("Current state:", state);
    console.log("Incoming action:", action);

    switch (action.type) {
        case FETCH_ONGOING_ORDERS_START:
            return {
            ...state,
            loading: true,
            error: null
            };
    
        case FETCH_ONGOING_ORDERS_SUCCESS:
            // console.log("Payload for FETCH_ONGOING_ORDERS_SUCCESS:", action.payload);
            return {
                ...state,
                onGoingOrders: action.payload,
                loading: false
            };
    
        case FETCH_ONGOING_ORDERS_FAILURE:
            return {
            ...state,
            loading: false,
            error: action.payload,
            onGoingOrders: []
            };
        
        case MARK_ORDER_AS_COMPLETED_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case MARK_ORDER_AS_COMPLETED_SUCCESS:
            return {
                ...state,
                loading: false
            };
        
        case MARK_ORDER_AS_COMPLETED_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case UPDATE_ORDER_STATUS:
            return {
                ...state,
                onGoingOrders: state.onGoingOrders.map(order => 
                    order.id === action.payload.orderId
                    ? { 
                        ...order, 
                        latestStatusDescription: action.payload.orderStatus,
                        orderStatus: [
                            ...order.orderStatus, 
                            { id: order.orderStatus.length + 1, status: action.payload.orderStatus, timestamp: new Date().toISOString() } 
                        ] 
                    } 
                    : order
                )
            };
        
        default:
            console.log('Unhandled action type:', action.type, 'with payload:', action.payload);
            return state;
    }
};
  
export default onGoingReducer;