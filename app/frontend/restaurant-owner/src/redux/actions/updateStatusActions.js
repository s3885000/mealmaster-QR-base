import api from '../../services/api';
export const PROGRESS_ORDER_REQUEST = 'PROGRESS_ORDER_REQUEST';
export const PROGRESS_ORDER_SUCCESS = 'PROGRESS_ORDER_SUCCESS';
export const PROGRESS_ORDER_FAILURE = 'PROGRESS_ORDER_FAILURE';


// Action creators
export const progressOrderRequest = () => ({
    type: PROGRESS_ORDER_REQUEST
});

export const progressOrderSuccess = (data) => ({
    type: PROGRESS_ORDER_SUCCESS,
    payload: data
});

export const progressOrderFailure = (error) => ({
    type: PROGRESS_ORDER_FAILURE,
    payload: error
});

// Async action creator using Redux Thunk
export const progressOrder = (orderId) => {
    return async dispatch => {
        dispatch(progressOrderRequest());

        try {
            const response = await api.patch(`/order-status/${orderId}/progress`);
            dispatch(progressOrderSuccess(response.data));
        } catch (error) {
            dispatch(progressOrderFailure(error.message));
        }
    };
};
