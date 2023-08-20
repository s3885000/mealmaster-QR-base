import { ADD_CARD_START, ADD_CARD_SUCCESS, ADD_CARD_FAILURE, CHARGE_USER_START, CHARGE_USER_SUCCESS, CHARGE_USER_FAILURE, FETCH_PAYMENTS_START, FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE} from '../actions/paymentActions';

const initialState = {
    loading: false,
    paymentData: null,
    addingCard: false,
    card: null,
    error: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD_START:
        
        case ADD_CARD_SUCCESS:

        case ADD_CARD_FAILURE:


        case CHARGE_USER_START:

        case CHARGE_USER_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null 
            };
        
        case CHARGE_USER_FAILURE:
            
        case FETCH_PAYMENTS_START:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };

        case FETCH_PAYMENTS_SUCCESS:
            return { 
                ...state, 
                payments: action.payload, 
                loading: false, 
                error: null 
            };

        case FETCH_PAYMENTS_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        default:
            return state;
    }
}


export default paymentReducer;