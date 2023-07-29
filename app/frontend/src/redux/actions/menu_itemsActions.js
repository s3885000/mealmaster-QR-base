import axios from 'axios';

export const fetchMenuItems = () => {
    return async (dispatch) => {
        dispatch(fetchMenuItemsRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/menu-items`);

            dispatch(fetchMenuItemsSuccess(response.data));
        } catch (error) {
            dispatch(fetchMenuItemsFailure(error.message));
        }
    }
}

export const fetchMenuItemsRequest = () => {
    return {
        type: 'FETCH_MENU_ITEMS_REQUEST'
    }
}

export const fetchMenuItemsSuccess = (data) => {
    return {
        type: 'FETCH_MENU_ITEMS_SUCCESS',
        payload: data
    }
}

export const fetchMenuItemsFailure = (error) => {
    return {
        type: 'FETCH_MEN_ITEMS_FAILURE',
        payload: error
    }
}