import { loginRequest, loginSuccess, loginFailure, logout, checkEmailSuccess, checkEmailFailure, checkEmailRequest } from './authActions';
import { loginUser as loginUserAPI, checkEmail as checkEmailAPI } from '../../../services/user.js';

// Check Email
export const checkEmail = (email) => {
    return async (dispatch) => {
        dispatch(checkEmailRequest());
        try {
            const response = await checkEmailAPI(email); 
            dispatch(checkEmailSuccess(response.data.valid));
        } catch (error) {
            console.log('Email check error:', error.response ? error.response.data.message : error.message);
            dispatch(checkEmailFailure(error));
        }
    };
};

// Login User
export const loginUser = (credentials, isGuest = false, isOwner = false) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        let endpoint = '/auth/login'; 
        if (isGuest) {
            credentials = { ...credentials, guest: true };
        } else if (isOwner) {
            endpoint = '/auth/restaurant-owner/login'; 
        }
        try {
            const response = await loginUserAPI(credentials, endpoint); 
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
                dispatch(loginSuccess(response));
                return true;
            } else {
                dispatch(loginFailure(response));
                return false;
            }
        } catch (error) {
            console.log('Login error:', error.response ? error.response.data.message : error.message);
            dispatch(loginFailure(error));
            return false;
        }
    };
};

// Logout User
export const logoutUser = () => {
    return async (dispatch) => {
        try {
            // Assuming you might have an API endpoint to handle server-side logout
            // await api.post(`/auth/logout`);
        } catch (error) {
            console.log('Login error:', error.response ? error.response.data.message : error.message);
            dispatch(loginFailure(error));
            return false;
        }
        localStorage.removeItem('accessToken');
        dispatch(logout());
    };
};
