import api from "../../services/api";
import { fetchOrders } from "./orderActions";


export const FETCH_ONGOING_ORDERS_START = 'FETCH_ONGOING_ORDERS_START';
export const FETCH_ONGOING_ORDERS_SUCCESS = 'FETCH_ONGOING_ORDERS_SUCCESS';
export const FETCH_ONGOING_ORDERS_FAILURE = 'FETCH_ONGOING_ORDERS_FAILURE';

export const fetchOnGoingOrders = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_ONGOING_ORDERS_START });
  
    try {
        const response = await api.get(`/order/${userId}/ongoing-orders`);
        console.log("API Response for fetchOngoingOrders:", response);
        console.log("Fetched ongoing orders data:", response.data);
        
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

export const MARK_ORDER_AS_COMPLETED_START = 'MARK_ORDER_AS_COMPLETED_START';
export const MARK_ORDER_AS_COMPLETED_SUCCESS = 'MARK_ORDER_AS_COMPLETED_SUCCESS';
export const MARK_ORDER_AS_COMPLETED_FAILURE = 'MARK_ORDER_AS_COMPLETED_FAILURE';

export const markOrderAsCompleted = (orderId, userId) => async (dispatch) => {
    dispatch({ type: MARK_ORDER_AS_COMPLETED_START });
    try {
        await api.put(`/order-status/${orderId}/complete`);
        dispatch({ type: MARK_ORDER_AS_COMPLETED_SUCCESS });
        dispatch(fetchOnGoingOrders(userId));

        dispatch(fetchOrders(userId));
    } catch (error) {
        console.error("Error marking order as completed:", error);
        dispatch({
            type: MARK_ORDER_AS_COMPLETED_FAILURE,
            payload: error.message
        });
    }
};

export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';

export const updateOrderStatusInStore = (orderId, orderStatus) => {
    console.log("updateOrderStatusInStore called with orderId:", orderId, "and orderStatus:", orderStatus);
    return {
        type: UPDATE_ORDER_STATUS,
        payload: { orderId, orderStatus }
    };
};
