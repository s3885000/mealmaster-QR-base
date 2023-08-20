import axios from 'axios';
import jwtDecode from 'jwt-decode';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        //console.log("Sending Token:", token);
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
  
export default api;

// Function to decode the token and get user details
export const decodeToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
      const decoded = jwtDecode(token);
      return {
          ...decoded,
          userId: decoded.sub // Map 'sub' to 'userId' for consistency
      };
  } catch (e) {
      console.error("Failed to decode token:", e);
      return null;
  }
}
