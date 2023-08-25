import { loginSuccess } from './authActions';

export const loginUser = (username, password) => {
  return (dispatch) => {
    const mockUser = { id: 1, name: "John Doe" };
    dispatch(loginSuccess(mockUser));
  };
};
