import axios from 'axios';

export const fetchCategory = () => {
    return async (dispatch) => {
        dispatch(fetchCategoryRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Category`);

            dispatch(fetchCategorySuccess(response.data));
        } catch (error) {
            dispatch(fetchCategoryFailure(error.message));
        }
    }
}

export const fetchCategoryRequest = () => {
    return {
        type: 'FETCH_CATEGORY_REQUEST'
    }
}

export const fetchCategorySuccess = (data) => {
    return {
        type: 'FETCH_CATEGORY_SUCCESS',
        payload: data
    }
}

export const fetchCategoryFailure = (error) => {
    return {
        type: 'FETCH_CATEGORY_FAILURE',
        payload: error
    }
}