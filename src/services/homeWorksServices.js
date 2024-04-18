import axios from 'axios';

export function getAllHomeworksService() {
  return axios.get('/homeworks');
}

export function getHomeworkService(homeWorkId) {
  return axios.get(`/homeworks/${homeWorkId}`);
}

export function deleteHomeworkService(homeWorkId) {
  return axios.delete(`/homeworks/${homeWorkId}`);
}

export function amendHomeworkService(homeWorkId, homeWork) {
  return axios.put(`/homeworks/${homeWorkId}`, homeWork);
}

export function createHomeworkService(data) {
  return axios.post('/homeworks', data);
}
