// API Configuration
const API_BASE_URL = 'https://erokda-backend.onrender.com';

export const API_ENDPOINTS = {
  SIGNIN: `${API_BASE_URL}/api/v1/signin`,
  SIGNUP: `${API_BASE_URL}/api/v1/signup`,
  GET_BALANCE: `${API_BASE_URL}/api/v1/account/getBalance`,
  TRANSFER: `${API_BASE_URL}/api/v1/account/transfer`,
  GET_ALL_USERS: `${API_BASE_URL}/api/v1/users/getAllUsers`,
  UPDATE_USER: `${API_BASE_URL}/api/v1/users/update`,
};

export default API_BASE_URL;
