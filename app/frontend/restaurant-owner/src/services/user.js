import { loginUserAPI, checkEmailAPI } from './api';

// Verify if an email is registered
export const checkEmail = (email) => {
    return checkEmailAPI(email);
};

// Login using email and password
export const loginUser = (credentials) => {
    return loginUserAPI(credentials.email, credentials.password);
};
