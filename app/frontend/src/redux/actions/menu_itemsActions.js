import axios from 'axios';

export const fetchMenu = () => {
    return async (dispatch) => {
        dispatch(fetchMenuRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Menu`);

            dispatch(fetchMenuSuccess(response.data));
        } catch (error) {
            dispatch(fetchMenuFailure(error.message));
        }
    }
}

export const fetchMenuRequest = () => {
    return {
        type: 'FETCH_MENU_REQUEST'
    }
}

export const fetchMenuSuccess = (data) => {
    return {
        type: 'FETCH_MENU_SUCCESS',
        payload: data
    }
}

export const fetchMenuFailure = (error) => {
    return {
        type: 'FETCH_MENU_FAILURE',
        payload: error
    }
}