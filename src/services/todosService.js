import axios from 'axios';

export function getTodosService() {
  return axios.get('/todos');
}
