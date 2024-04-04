import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use((res) => {
  return res.data;
});

axios.interceptors.request.use((value) => {
  const token = getToken();
  if (!token) {
    return value;
  }

  value.headers.Authorization = `Bearer ${token}`;
  return value;
});

export function setToken(token) {
  localStorage.setItem('auth_token', token);
}

export function getToken() {
  return localStorage.getItem('auth_token');
}

export function clearToken() {
  localStorage.removeItem('auth_token');
}
