import axios from 'axios';
import handleResponse from './resHandler';

export default {
  getAll: async () => {
    try {
      const res = await axios.get(`/api/member`);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  query: async (query) => {
    try {
      const res = await axios.post(`/api/member/query`, query);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  add: async (newMember) => {
    try {
      const res = await axios.post(`/api/member`, newMember);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  patch: async (id, data) => {
    try {
      const res = await axios.patch(`/api/member/` + id, data);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  delete: async (id) => {
    try {
      const res = await axios.delete(`/api/member/` + id);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  }
}