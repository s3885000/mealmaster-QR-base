import {
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE
  } from '../actions/orderActions';
  
  const initialState = {
    loading: false,
    orders: [],
    error: ''
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDERS_REQUEST:
        return {
          ...state,
          loading: true
        };
      case GET_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
          error: ''
        };
      case GET_ORDERS_FAILURE:
        return {
          loading: false,
          orders: [],
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  