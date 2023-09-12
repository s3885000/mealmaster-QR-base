import api, { decodeToken }from '../../services/api';

export const ADD_CARD_START = 'ADD_CARD_START';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';

export const FETCH_CARDS_START = 'FETCH_CARDS_START';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const CHARGE_USER_START = 'CHARGE_USER_START';
export const CHARGE_USER_SUCCESS = 'CHARGE_USER_SUCCESS';
export const CHARGE_USER_FAILURE = 'CHARGE_USER_FAILURE';

export const FETCH_PAYMENTS_START = 'FETCH_PAYMENTS_START';
export const FETCH_PAYMENTS_SUCCESS = 'FETCH_PAYMENTS_SUCCESS';
export const FETCH_PAYMENTS_FAILURE = 'FETCH_PAYMENTS_FAILURE';

export const SET_DEFAULT_CARD_START = 'SET_DEFAULT_CARD_START';
export const SET_DEFAULT_CARD_SUCCESS = 'SET_DEFAULT_CARD_SUCCESS';
export const SET_DEFAULT_CARD_FAILURE = 'SET_DEFAULT_CARD_FAILURE';

export const FETCH_DEFAULT_CARD_START = 'FETCH_DEFAULT_CARD_START';
export const FETCH_DEFAULT_CARD_SUCCESS = 'FETCH_DEFAULT_CARD_SUCCESS';
export const FETCH_DEFAULT_CARD_FAILURE = 'FETCH_DEFAULT_CARD_FAILURE';

export const addCard = (token) => async dispatch => {
    const decoded = decodeToken();
    if (!decoded || !decoded.userId) {
        // Handle error: Token is invalid or userId is not present in the token
        dispatch({ 
            type: ADD_CARD_FAILURE, 
            payload: "Token is invalid or userId is not present in the token"
        });
        return;
    }

    const userId = decoded.userId;

    dispatch({ type: ADD_CARD_START });
    try {
        await api.post(`/payment/${userId}/card`, { token });
        dispatch({ type: ADD_CARD_SUCCESS });
    } catch (error) {
        dispatch({ 
            type: ADD_CARD_FAILURE, 
            payload: error.message 
        });
    }
};

export const fetchCards = () => async dispatch => {
    const decoded = decodeToken();
    if (!decoded || !decoded.userId) {
        dispatch({ 
            type: FETCH_CARDS_FAILURE, 
            payload: "Token is invalid or userId is not present in the token"
        });
        return;
    }

    const userId = decoded.userId;

    dispatch({ type: FETCH_CARDS_START });
    try {
        const response = await api.get(`/payment/${userId}/cards`);
        dispatch({ 
            type: FETCH_CARDS_SUCCESS, 
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_CARDS_FAILURE, 
            payload: error.message 
        });
    }
};

export const chargeUser = (amountInDongs) => async dispatch => {
    const decoded = decodeToken();
    if (!decoded || !decoded.userId) {
        // Handle error: Token is invalid or userId is not present in the token
        dispatch({ 
            type: CHARGE_USER_FAILURE, 
            payload: "Token is invalid or userId is not present in the token"
        });
        return;
    }

    const userId = decoded.userId;

    dispatch({ type: CHARGE_USER_START });
    try {
        const response = await api.post(`/payment/${userId}/charge`, { amountInDongs });
        dispatch({ type: CHARGE_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CHARGE_USER_FAILURE, payload: error.message });
    }
};


export const fetchPayments = () => async dispatch => {
    dispatch({ 
        type: FETCH_PAYMENTS_START 
    });
    try {
        const response = await api.get('/payment');
        dispatch({ 
            type: FETCH_PAYMENTS_SUCCESS, 
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_PAYMENTS_FAILURE, 
            payload: error.message 
        });
    }
};

export const setDefaultCard = (cardId) => async dispatch => {
    const decoded = decodeToken();
    if (!decoded || !decoded.userId) {
        dispatch({ 
            type: SET_DEFAULT_CARD_FAILURE, 
            payload: "Token is invalid or userId is not present in the token"
        });
        return;
    }

    const userId = decoded.userId;

    dispatch({ type: SET_DEFAULT_CARD_START });

    try {
        const response = await api.put(`/payment/${userId}/default-card/${cardId}`);
        if (response.data.success) {
            dispatch({ type: SET_DEFAULT_CARD_SUCCESS, payload: cardId });
        } else {
            dispatch({ type: SET_DEFAULT_CARD_FAILURE, payload: response.data.message });
        }
    } catch (error) {
        dispatch({ type: SET_DEFAULT_CARD_FAILURE, payload: error.message });
    }
};

export const fetchDefaultCard = () => async dispatch => {
    const decoded = decodeToken();
    if (!decoded || !decoded.userId) {
        dispatch({ 
            type: FETCH_DEFAULT_CARD_FAILURE, 
            payload: "Token is invalid or userId is not present in the token"
        });
        return;
    }

    const userId = decoded.userId;

    dispatch({ type: FETCH_DEFAULT_CARD_START });
    try {
        const response = await api.get(`/payment/${userId}/default-card`);
        dispatch({ 
            type: FETCH_DEFAULT_CARD_SUCCESS, 
            payload: response.data 
        });
    } catch (error) {
        dispatch({ 
            type: FETCH_DEFAULT_CARD_FAILURE, 
            payload: error.message 
        });
    }
};