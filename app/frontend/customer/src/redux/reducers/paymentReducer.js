import { ADD_CARD_START, ADD_CARD_SUCCESS, ADD_CARD_FAILURE, CHARGE_USER_START, CHARGE_USER_SUCCESS, CHARGE_USER_FAILURE, FETCH_PAYMENTS_START, FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE, FETCH_CARDS_START, FETCH_CARDS_SUCCESS, FETCH_CARDS_FAILURE, SET_DEFAULT_CARD_START, SET_DEFAULT_CARD_FAILURE, SET_DEFAULT_CARD_SUCCESS, FETCH_DEFAULT_CARD_FAILURE, FETCH_DEFAULT_CARD_START, FETCH_DEFAULT_CARD_SUCCESS} from '../actions/paymentActions';

const initialState = {
    loading: false,
    paymentData: null,
    addingCard: false,
    card: null,
    error: null,
    cards: [],
    settingDefault: false,
    defaultCard: null,
};

const paymentReducer = (state = initialState, action) => {
    // console.log("Action received in paymentReducer:", action.type, "with payload:", action.payload);
    switch (action.type) {
        case ADD_CARD_START:
            return { 
                ...state, 
                addingCard: true, 
                error: null 
            };

        case ADD_CARD_SUCCESS:
            return { 
                ...state, 
                addingCard: false, 
                card: action.payload,
                error: null 
            };

        case ADD_CARD_FAILURE:
            return { 
                ...state, 
                addingCard: false, 
                error: action.payload 
            };

        case FETCH_CARDS_START:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };

        case FETCH_CARDS_SUCCESS:
            return { 
                ...state, 
                cards: action.payload, 
                loading: false, 
                error: null 
            };

        case FETCH_CARDS_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        case CHARGE_USER_START:
            return {
                ...state, 
                loading: false, 
                error: null
            }

        case CHARGE_USER_SUCCESS:
            return { 
                ...state, 
                loading: false,
                paymentData: action.payload,
                error: null 
            };
        
        case CHARGE_USER_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload,
            }
            
        case FETCH_PAYMENTS_START:
            return { 
                ...state, 
                loading: true, 
                error: null,
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

        case SET_DEFAULT_CARD_START:
            return { 
                ...state, 
                settingDefault: true, 
                error: null 
            };

        case SET_DEFAULT_CARD_SUCCESS:
            return { 
                ...state, 
                defaultCard: action.payload,
                error: null 
            };

        case SET_DEFAULT_CARD_FAILURE:
            return { 
                ...state, 
                settingDefault: false, 
                error: action.payload 
            };

        case FETCH_DEFAULT_CARD_START:
            return {
                ...state,
                loading: true
            };

        case FETCH_DEFAULT_CARD_SUCCESS:
            return {
                ...state,
                loading: false,
                defaultCard: action.payload
            };

        case FETCH_DEFAULT_CARD_FAILURE:
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