import api from './api';

export const loginResOwnerUser = (credentials) => {
    return api.post('/auth/restaurant-owner/login', credentials);
};

export const registerResOwnerUser = (data) => {
    return api.post('/user/register', data);
};