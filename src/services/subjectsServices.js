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

export function amendSubjectService(subjectId, subjectName) {
  return axios.put(`/subjects/${subjectId}`, { name: subjectName });
}

export function deleteSubjectService(subjectId) {
  return axios.delete(`/subjects/${subjectId}`);
}
