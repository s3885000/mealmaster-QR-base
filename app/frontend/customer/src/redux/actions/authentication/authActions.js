export const CHECK_PHONE_NUMBER_REQUEST = 'CHECK_PHONE_NUMBER_REQUEST';
export const CHECK_PHONE_NUMBER_SUCCESS = 'CHECK_PHONE_NUMBER_SUCCESS';
export const CHECK_PHONE_NUMBER_FAILURE = 'CHECK_PHONE_NUMBER_FAILURE';

export const checkPhoneNumberRequest = () => ({
    type: CHECK_PHONE_NUMBER_REQUEST,
});

export const checkPhoneNumberSuccess = (exists) => ({
    type: CHECK_PHONE_NUMBER_SUCCESS,
    payload: exists,
});

export const checkPhoneNumberFailure = (error) => ({
    type: CHECK_PHONE_NUMBER_FAILURE,
    payload: error,
});


export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const loginSuccess = (user) => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: AUTH_LOGIN_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: AUTH_LOGOUT,
});