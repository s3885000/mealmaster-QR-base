import axios from 'axios'

export const fetchMenuItemDetails = (itemId) => {
    return async (dispatch) => {
        dispatch(fetchMenuItemDetailsRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/item/${itemId}`, { withCredentials: true });

            dispatch(fetchMenuItemDetailsSuccess(response.data));
        } catch (error) {
            dispatch(fetchMenuItemDetailsFailure(error.message));
        }
    }
}

export const fetchMenuItemDetailsRequest = () => {
    return {
        type: 'FETCH_MENU_ITEM_DETAILS_REQUEST'
    }
}

export const fetchMenuItemDetailsSuccess = (data) => {
    return {
        type: 'FETCH_MENU_ITEM_DETAILS_SUCCESS',
        payload: data
    }
}

export const fetchMenuItemDetailsFailure = (error) => {
    return {
        type: 'FETCH_MENU_ITEM_DETAILS_FAILURE',
        payload: error
    }
}
