import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuth = (username, password) => {
  const token = btoa(`${username}:${password}`);
  axiosClient.defaults.headers.common['Authorization'] = `Basic ${token}`;
};

export const clearAuth = () => {
  delete axiosClient.defaults.headers.common['Authorization'];
};

export default axiosClient;
