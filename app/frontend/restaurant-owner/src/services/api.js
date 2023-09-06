import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log("Axios baseURL:", api.defaults.baseURL);

export const checkEmailAPI = async (email) => {
  const response = await api.get(`/auth/check-email`, { params: { email } });
  return response.data;
};

export const loginUserAPI = async (email, password) => {
  console.log("Sending login data:", { email, password }); 
  const response = await api.post(`/auth/restaurant-owner/login`, { email, password });
  return response.data;
};

export const signupUserAPI = async (name, email, password) => {
  console.log("Sending signup data:", { name, email, password }); 
  const response = await api.post(`/auth/restaurant-owner/signup`, { name, email, password });
  return response.data;
};

