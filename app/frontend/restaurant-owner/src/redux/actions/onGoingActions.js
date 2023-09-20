import api from "../../services/api";
export const FETCH_ONGOING_ORDERS_START = 'FETCH_ONGOING_ORDERS_START';
export const FETCH_ONGOING_ORDERS_SUCCESS = 'FETCH_ONGOING_ORDERS_SUCCESS';
export const FETCH_ONGOING_ORDERS_FAILURE = 'FETCH_ONGOING_ORDERS_FAILURE';


export const fetchOnGoingOrders = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_ONGOING_ORDERS_START });
  
    try {
        const response = await api.get(`/order/${userId}/ongoing-orders-owner`);
        dispatch({
            type: FETCH_ONGOING_ORDERS_SUCCESS,
            payload: response.data
        });
    
        } catch (error) {
        console.error("Error fetching ongoing orders:", error.response ? error.response.data : error.message);
        dispatch({
            type: FETCH_ONGOING_ORDERS_FAILURE,
            payload: error.message
        });
    }
};