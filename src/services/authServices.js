import axios from 'axios';

export function loginService(data) {
  return axios.post('/auth/login', data);
}

export function registerService(data) {
  return axios.post('/auth/register', data);
}

export function verifyService() {
  return axios.get('/auth/verify');
}
