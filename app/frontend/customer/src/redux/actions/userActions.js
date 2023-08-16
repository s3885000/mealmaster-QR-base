import api, { decodeToken } from '../../services/api';

export const FETCH_USER_PROFILE_START = 'FETCH_USER_PROFILE_START';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

// Action creators
const fetchUserProfileStart = () => ({
  type: FETCH_USER_PROFILE_START,
});

const fetchUserProfileSuccess = (user) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: user,
});

const fetchUserProfileFailure = (error) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

// Async action to fetch user profile
export const fetchUserProfile = () => {
  return async (dispatch) => {
    dispatch(fetchUserProfileStart());

    const tokenData = decodeToken();
    const userId = tokenData?.sub;

    if (!userId) {
      dispatch(fetchUserProfileFailure("Unable to extract user ID from token"));
      return;
    }

    try {
      const response = await api.get(`/user/${userId}/profile`);
      dispatch(fetchUserProfileSuccess(response.data));
    } catch (error) {
      dispatch(fetchUserProfileFailure(error.message));
    }
  };
};
