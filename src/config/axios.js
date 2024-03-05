import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use((res) => {
  return res.data;
});
