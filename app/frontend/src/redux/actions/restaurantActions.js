import axios from 'axios';

export const fetchRestaurants = () => {
    return async (dispatch) => {
        dispatch(fetchRestaurantsRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/restaurant`);

            dispatch(fetchRestaurantsSuccess(response.data));
        } catch (error) {
            dispatch(fetchRestaurantsFailure(error.message));
        }
    }
}

export const fetchRestaurantsRequest = () => {
    return {
        type: 'FETCH_RESTAURANTS_REQUEST'
    }
}

export const fetchRestaurantsSuccess = (data) => {
    return {
        type: 'FETCH_RESTAURANTS_SUCCESS',
        payload: data
    }
}

export const fetchRestaurantsFailure = (error) => {
    return {
        type: 'FETCH_RESTAURANTS_FAILURE',
        payload: error
    }
}