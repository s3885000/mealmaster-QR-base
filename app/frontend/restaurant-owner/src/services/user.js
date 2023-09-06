import { loginUserAPI, checkEmailAPI, signupUserAPI } from './api';

// Verify if an email is registered
export const checkEmail = (email) => {
    return checkEmailAPI(email);
};

// Login using email and password
export const loginUser = (credentials) => {
    return loginUserAPI(credentials.email, credentials.password);
};

// Use the signup API to register a user
export const signupUser = (credentials) => {
    return signupUserAPI(credentials.name, credentials.email, credentials.password);
};