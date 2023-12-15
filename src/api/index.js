import axios from 'axios';

const getData = () => {
  return JSON.parse(localStorage.getItem('user-auth-token'));
};

const setData = (data) => {
  localStorage.setItem('user-auth-token', JSON.stringify(data));
};

const removeData = () => {
  localStorage.removeItem('user-auth-token');
};

const setToken = (token, user) => {
  updateTokenHeader(token);
  const data = {
    token: token,
    user: user,
    expiresAt: Date.now() + 259200000,
  };
  setData(data);
};

const isValidToken = () => {
  const data = getData();
  if (data === null) return false;
  return data && data.expiresAt && data.expiresAt > Date.now();
};

const getToken = () => {
  if (isValidToken()) return getData().token;
  localStorage.removeItem('user-auth-token');
  return null;
};

export const getUser = () => {
  if (isValidToken()) return getData().user;
  return null;
};

export const logout = () => {
  removeData();
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    token: getToken(),
  },
});

const updateTokenHeader = (token) => {
  api.defaults.headers.common['token'] = token;
};

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.token) {
      setToken(response.data.token, response.data.data);
    }
    return response;
  },
  (error) => {
    // Handle the error
    if (error.code === 'ERR_NETWORK') {
      // Handle the ERR_CONNECTION_REFUSED error
      // window.location = '/server_down_page_path';
    }
    return Promise.reject(error);
  }
);

export default api;
