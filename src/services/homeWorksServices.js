import axios from 'axios';

export function getAllHomeWorksService() {
  return axios.get('/homeworks');
}

export function getHomeWorkService(homeWorkId) {
  return axios.get(`/homeworks/${homeWorkId}`);
}

export function deleteHomeWorkService(homeWorkId) {
  return axios.delete(`/homeworks/${homeWorkId}`);
}

export function amendHomeWorkService(homeWorkId, homeWork) {
  return axios.put(`/homeworks/${homeWorkId}`, homeWork);
}

export function createHomeWorkService() {
  return axios.post('/homeworks');
}
