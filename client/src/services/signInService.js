import axios from 'axios';
import handleResponse from './resHandler';

export default {
  login: async (token) => {
    try {
      const res = await axios.post(`/api/user/auth`, {token: token});
      localStorage.setItem('user', JSON.stringify({...res.data, id_token: token}));
      return res.data;
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  logout() {
    localStorage.removeItem('user');
  }
}