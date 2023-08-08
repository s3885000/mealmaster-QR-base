import axios from 'axios';
import { loginSuccess, loginFailure, logout } from './authActions';

export const loginUser = (credentials, isGuest = false) => {
  return async (dispatch) => {
    try {
      const url = isGuest
        ? `${process.env.REACT_APP_API_BASE_URL}/auth/guest/login`
        : `${process.env.REACT_APP_API_BASE_URL}/auth/login`;

      const response = await axios.post(url, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(loginSuccess(response.data));
        return true;
      } else {
        dispatch(loginFailure(response.data));
        return false;
      }

    } catch (error) {
        console.log('Login error:', error.response ? error.response.data : error);
      dispatch(loginFailure(error));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('accessToken');
    dispatch(logout());
  };
};
