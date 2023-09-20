import {AUTH_LOGIN_REQUEST, CHECK_EMAIL_REQUEST, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT, AUTH_SIGNUP_REQUEST, AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_FAILURE} from '../../actions/authentication/authActions';

const initialState = {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    user: {
        accessToken: localStorage.getItem('accessToken'),
    },
    emailExists: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case AUTH_LOGIN_REQUEST:
      case CHECK_EMAIL_REQUEST:
    //   case AUTH_SIGNUP_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          };
      case CHECK_EMAIL_SUCCESS:
          return {
              ...state,
              emailExists: action.payload,
              loading: false,
          };
      case CHECK_EMAIL_FAILURE:
          return {
              ...state,
              emailExists: null,
              loading: false,
              error: action.payload,
          };
      case AUTH_LOGIN_SUCCESS:
    //   case AUTH_SIGNUP_SUCCESS:
          return {
              ...state,
              isAuthenticated: true,
              user: action.payload,
              loading: false,
          };
      case AUTH_LOGIN_FAILURE:
    //   case AUTH_SIGNUP_FAILURE:
          return {
              ...state,
              isAuthenticated: false,
              user: null,
              loading: false,
              error: action.payload,
          };
      case AUTH_LOGOUT:
          return {
              ...state,
              error: null,
              user: null,
          };
      default:
          return state;
  }
};

export default authReducer;
