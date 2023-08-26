import { loginRequest, loginSuccess, loginFailure } from './authActions';

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest());

    setTimeout(() => {
      if (username === "test" && password === "test123") {
        const mockUser = { id: 1, name: "John Doe" };
        dispatch(loginSuccess(mockUser));
      } else {
        dispatch(loginFailure("Invalid username or password."));
      }
    }, 1000);
  };
};
