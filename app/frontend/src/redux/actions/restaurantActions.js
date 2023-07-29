import axios from 'axios';

export const fetchRestaurant = () => {
    return async (dispatch) => {
        dispatch(fetchRestaurantRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurant`);

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
        payload: data
    }
}

export const fetchRestaurantFailure = (error) => {
    return {
        type: 'FETCH_RESTAURANT_FAILURE',
        payload: error
    }
}