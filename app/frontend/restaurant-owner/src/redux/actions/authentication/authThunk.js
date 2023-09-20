import {loginRequest, loginSuccess, loginFailure, logout, checkEmailSuccess, checkEmailFailure, checkEmailRequest, signupRequest, signupFailure, signupSuccess} from './authActions';
import api from '../../../services/api';


// Check Email
export const checkEmail = (email) => {
  return async (dispatch) => {
      dispatch(checkEmailRequest());
      try {
          const response = await api.post('/auth/validate-email', { email: email });
          dispatch(checkEmailSuccess(response.data.valid));
      } catch (error) {
          console.log('Email check error:' + error.response ? error.response.data : error );
          dispatch(checkEmailFailure(error));
      }
  };
};

// Login User
export const loginUser = (credentials) => {
    return async (dispatch) => {
        dispatch(loginRequest());

        try {
            const response = await api.post('/auth/restaurant-owner/login', credentials, {
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
            console.log('Login error:', error.response ? error.response.data.message : error.message);
            dispatch(loginFailure(error));
            return false;
        }
    };
};

export const signUpUser = (userData) => {
    return async (dispatch) => {
        dispatch(signupRequest());
        try {
            // Directly using the API call here:
            const response = await api.post('/user/register', userData);
            
            if (response.data.someCondition) {
                dispatch(signupSuccess(response.data));
                return true;
            } else {
                dispatch(signupFailure(response.data));
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

