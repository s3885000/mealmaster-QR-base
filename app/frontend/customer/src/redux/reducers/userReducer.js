import {
    FETCH_USER_PROFILE_START,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
  } from '../actions/userActions';
  
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_PROFILE_START:
        return {
          ...state,
          loading: true,
        };
  
      case FETCH_USER_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
  
      case FETCH_USER_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  