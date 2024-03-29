export const CHECK_EMAIL_REQUEST = 'CHECK_EMAIL_REQUEST';
export const CHECK_EMAIL_SUCCESS = 'CHECK_EMAIL_SUCCESS';
export const CHECK_EMAIL_FAILURE = 'CHECK_EMAIL_FAILURE';



export const checkEmailRequest = () => ({
    type: CHECK_EMAIL_REQUEST,
});

export const checkEmailSuccess = (exists) => ({
    type: CHECK_EMAIL_SUCCESS,
    payload: exists,
});

export const checkEmailFailure = (error) => ({
    type: CHECK_EMAIL_FAILURE,
    payload: error,
});

// Constants for authentication using email and password
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const loginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

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

// NEW - Constants for Signup
export const AUTH_SIGNUP_REQUEST = 'AUTH_SIGNUP_REQUEST';
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';
export const AUTH_SIGNUP_FAILURE = 'AUTH_SIGNUP_FAILURE';

// NEW - Actions for Signup
export const signupRequest = () => ({
    type: AUTH_SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
    type: AUTH_SIGNUP_SUCCESS,
    payload: user,
});

export const signupFailure = (error) => ({
    type: AUTH_SIGNUP_FAILURE,
    payload: error,
});
