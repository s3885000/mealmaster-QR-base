import { PROGRESS_ORDER_FAILURE, PROGRESS_ORDER_REQUEST, PROGRESS_ORDER_SUCCESS } from "../actions/updateStatusActions";

const initialState = {
    loading: false,
    data: null,
    error: null
};

const progressOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROGRESS_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PROGRESS_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null
            };
        case PROGRESS_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default progressOrderReducer;
