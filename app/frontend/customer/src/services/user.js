import api from './api';

export const loginUser = (credentials) => {
    return api.post('/auth/login', credentials);
};

export const registerUser = (data) => {
    return api.post('/user/register', data);
};