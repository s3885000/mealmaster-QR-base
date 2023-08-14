import axios from 'axios';

export const fetchMenuItems = (restaurantId, categoryId, tableNo) => {
    return async (dispatch) => {
        dispatch(fetchMenuItemsRequest());

        // Avoid fetching items for the default "best seller" category if -1
        if (categoryId === -1) {
            dispatch(fetchBestSellers(restaurantId, tableNo));  // or any default value
            return;
        }

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurant/${restaurantId}/category/${categoryId}/items`, { withCredentials: true });
            dispatch(fetchMenuItemsSuccess(response.data));
        } catch (error) {
            dispatch(fetchMenuItemsFailure(error.message));
        }
    }
}

export const fetchBestSellers = (restaurantId, tableNo) => {
    console.log('Restaurant ID:', restaurantId);
    console.log('Table No:', tableNo);
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurant/${restaurantId}/table/${tableNo}/best-sellers`, { withCredentials: true });
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
        type: 'FETCH_MENU_ITEMS_FAILURE',
        payload: error
    }
}
