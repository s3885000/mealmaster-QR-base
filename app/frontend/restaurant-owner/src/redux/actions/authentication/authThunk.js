import {loginRequest, loginSuccess, loginFailure, logout, checkEmailSuccess, checkEmailFailure, checkEmailRequest, signupRequest, signupSuccess, signupFailure} from './authActions';
import {loginUser as loginUserAPI, checkEmail as checkEmailAPI, signupUser as signupUserAPI} from '../../../services/user.js';

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
      let endpoint = '/auth/restaurant-owner/login';
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

// Signup User
export const signupUser = (credentials) => {
  return async (dispatch) => {
      dispatch(signupRequest());
      try {
          const response = await signupUserAPI(credentials);
          if (response.accessToken) {
              localStorage.setItem('accessToken', response.accessToken);
              dispatch(signupSuccess(response));
              return true;
          } else {
              dispatch(signupFailure(response));
              return false;
          }
      } catch (error) {
          console.log('Signup error:', error.response ? error.response.data.message : error.message);
          dispatch(signupFailure(error));
          return false;
      }
  };
};

// Logout User
export const logoutUser = () => {
  return async (dispatch) => {
      try {
      } catch (error) {
          console.log('Logout error:', error.response ? error.response.data.message : error.message);
          dispatch(loginFailure(error));
          return false;
      }
      localStorage.removeItem('accessToken');
      dispatch(logout());
  };
};

