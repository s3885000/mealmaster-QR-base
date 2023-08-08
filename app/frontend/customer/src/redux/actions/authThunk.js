import axios from 'axios';
import { loginSuccess, loginFailure, logout, checkPhoneNumberSuccess, checkPhoneNumberFailure, checkPhoneNumberRequest } from './authActions';

export const checkPhoneNumber = (phoneNumber) => {
  return async (dispatch) => {
    dispatch(checkPhoneNumberRequest());

    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/auth/validate-phone-number`;
      const response = await axios.post(url, { phone_number: phoneNumber });
      console.log('Server Response:', response.data);
      dispatch(checkPhoneNumberSuccess(response.data.valid));
    } catch (error) {
      console.log( 'Phone number check error: ' + error.response ? error.response.data : error );
      dispatch(checkPhoneNumberFailure(error));
    };
  };
};

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
  return async (dispatch) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`);
    } catch (error) {
      console.log('Logout error:', error.response ? error.response.data : error);
    }

    localStorage.removeItem('accessToken');
    dispatch(logout());
  };
};

