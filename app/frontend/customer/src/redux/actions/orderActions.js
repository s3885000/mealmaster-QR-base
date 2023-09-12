import api from "../../services/api";

// Action Types
export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILURE = 'GET_ORDERS_FAILURE';

// Action Creators
export const getOrdersRequest = () => {
  return {
    type: GET_ORDERS_REQUEST
  };
};

export const getOrdersSuccess = (orders) => {
  return {
    type: GET_ORDERS_SUCCESS,
    payload: orders
  };
};

export const getOrdersFailure = (error) => {
  return {
    type: GET_ORDERS_FAILURE,
    payload: error
  };
};

export const fetchOrders = (userId) => {
  return (dispatch) => {
    dispatch(getOrdersRequest());
    api.get(`/order/${userId}/completed-orders`)
      .then(response => {
        // console.log("API response:", response.data);
        dispatch(getOrdersSuccess(response.data));
      })
      .catch(error => {
        // console.error("API error:", error);
        dispatch(getOrdersFailure(error.message));
      });
  };
};

