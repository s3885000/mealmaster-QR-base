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