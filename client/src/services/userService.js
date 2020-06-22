import axios from 'axios';
import handleResponse from './resHandler';

export default {
  patch: async (data) => {
    try {
      const res = await axios.patch(`/api/user/`, data);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  }
}