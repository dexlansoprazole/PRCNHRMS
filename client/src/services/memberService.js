import axios from 'axios';

export default {
  getAll: () => {
    return axios.get(`/api/member`).then(
      res => handleResponse(res),
      err => handleResponse(err.response)
    );
  },
  query: (query) => {
    return axios.post(`/api/member/query`, query).then(
      res => handleResponse(res),
      err => handleResponse(err.response)
    );
  },
  add: (newMember) => {
    return axios.post(`/api/member`, newMember).then(
      res => handleResponse(res),
      err => handleResponse(err.response)
    );
  },
  patch: (id, data) => {
    return axios.patch(`/api/member/` + id, data).then(
      res => handleResponse(res),
      err => handleResponse(err.response)
    );
  },
  delete: (id) => {
    return axios.delete(`/api/member/` + id).then(
      res => handleResponse(res),
      err => handleResponse(err.response)
    );
  }
}

function handleResponse(response) {
  const data = response.data;
  if (response.status !== 200) {
    console.error("Error (code: " + response.status + "): " +　data.name + ': ' + data.message);
    return Promise.reject(data);
  }

  return data;
}