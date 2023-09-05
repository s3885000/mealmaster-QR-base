import {AUTH_LOGIN_REQUEST, CHECK_EMAIL_REQUEST, CHECK_EMAIL_SUCCESS, CHECK_EMAIL_FAILURE, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT} from '../../actions/authentication/authActions';

const initialState = {
  isAuthenticated: false,
  user: null,
  emailExists: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case AUTH_LOGIN_REQUEST:
      case CHECK_EMAIL_REQUEST:
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
          return {
              ...state,
              isAuthenticated: true,
              user: action.payload,
              loading: false,
          };
      case AUTH_LOGIN_FAILURE:
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
