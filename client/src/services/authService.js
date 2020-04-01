import axios from 'axios';
import handleResponse from './resHandler';

export default {
  signIn: async (token) => {
    try {
      const res = await axios.post(`/api/auth/signin`, {token: token});
      return res.data;
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  signOut: async () => {
    try {
      const res = await axios.post(`/api/auth/signout`);
      return res.data;
    }
    catch (err) {
      return handleResponse(err.response);
    }
  }
}