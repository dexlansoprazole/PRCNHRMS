import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/member`);
    return res.data || [];
  },
  query: async (query) => {
    let res = await axios.post(`/api/member/query`, query);
    return res.data || [];
  },
  add: async (newMember) => {
    let res = await axios.post(`/api/member`, newMember);
    return res.data || null;
  },
  patch: async (id, data) => {
    let res = await axios.patch(`/api/member/` + id, data);
    return res.data || null;
  },
  delete: async (id) => {
    let res = await axios.delete(`/api/member/` + id);
    return res.data || null;
  }
}