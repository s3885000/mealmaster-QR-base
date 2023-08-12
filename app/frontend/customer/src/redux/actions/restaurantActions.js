import axios from 'axios';

export const fetchRestaurantData = ( restaurantId, tableNo ) => {
    return async (dispatch) => {
        dispatch(fetchRestaurantRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurant/${restaurantId}/table/${tableNo}`, { withCredentials: true });
            dispatch(fetchRestaurantSuccess(response.data));

        } catch (error) {
            dispatch(fetchRestaurantFailure(error.message));
        }
    }
}

export const fetchRestaurantRequest = () => {
    return {
        type: 'FETCH_RESTAURANT_REQUEST'
    }
}

export const fetchRestaurantSuccess = (data) => {
    return {
        type: 'FETCH_RESTAURANT_SUCCESS',
        payload: {
            restaurant: data.result.restaurant,
            table: data.result.table,
            categories: data.categories,
            banner: data.result.restaurant.banner,
            logo: data.result.restaurant.logo,
        }
    }
}

export const fetchRestaurantFailure = (error) => {
    return {
        type: 'FETCH_RESTAURANT_FAILURE',
        payload: error
    }
}

export const setRestaurantId = (restaurantId) => {
    return {
        type: 'SET_RESTAURANT_ID',
        payload: restaurantId
    }
}

export const setTableNo = (tableNo) => {
    return {
        type: 'SET_TABLE_NO',
        payload: tableNo
    }
}