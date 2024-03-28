import axios from 'axios';

export function getAllSubjectsService() {
  return axios.get('/subjects');
}

export function createSubjectService(subject) {
  return axios.post('/subjects', subject);
}

export function getSubjectService(subjectId) {
  return axios.get(`/subjects/${subjectId}`);
}

export function amendSubjectService(subjectId, subject) {
  return axios.put(`/subjects/${subjectId}`, subject);
}

export function deleteSubjectService(subjectId) {
  return axios.delete(`/subjects/${subjectId}`);
}
