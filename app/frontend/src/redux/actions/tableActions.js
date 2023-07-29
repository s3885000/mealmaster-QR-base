import axios from 'axios';

export const fetchTable = () => {
    return async (dispatch) => {
        dispatch(fetchTableRequest());

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/table`);

            dispatch(fetchTableSuccess(response.data));
        } catch (error) {
            dispatch(fetchTableFailure(error.message));
        }
    }
}

export const fetchTableRequest = () => {
    return {
        type: 'FETCH_TABLE_REQUEST'
    }
}

export const fetchTableSuccess = (data) => {
    return {
        type: 'FETCH_TABLE_SUCCESS',
        payload: data
    }
}

export const fetchTableFailure = (error) => {
    return {
        type: 'FETCH_TABLE_FAILURE',
        payload: error
    }
}