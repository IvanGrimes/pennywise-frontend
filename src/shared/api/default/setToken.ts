import axios from 'axios';

export const setToken = (token = '') => {
  axios.defaults.headers.Authorization = token ? `Bearer ${token}` : token;
};
