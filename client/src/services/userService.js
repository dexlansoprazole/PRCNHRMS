import axios from 'axios';

export default {
  login: (token) => {
    return axios.post(`/api/user/login`, {token: token}).then(
      res => {
        localStorage.setItem('user', JSON.stringify({...res.data, id_token: token}));
        return res.data;
      },
      err => handleResponse(err.response)
    );
  },
  logout() {
    localStorage.removeItem('user');
  }
}

function handleResponse(response) {
  const data = response.data;
  if (response.status !== 200) {
    console.error("Error (code: " + response.status + "): " + data.name + ': ' + data.message);
    return Promise.reject(data);
  }

  return data;
}