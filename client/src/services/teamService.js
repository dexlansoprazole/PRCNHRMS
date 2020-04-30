import axios from 'axios';
import handleResponse from './resHandler';

export default {
  get: async (query) => {
    try {
      const res = await axios.post(`/api/team/query`, query);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  add: async (newTeam) => {
    try {
      const res = await axios.post(`/api/team`, newTeam);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  patch: async (id, data) => {
    try {
      const res = await axios.patch(`/api/team/` + id, data);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  delete: async (id) => {
    try {
      const res = await axios.delete(`/api/team/` + id);
      return handleResponse(res);
    }
    catch (err) {
      return handleResponse(err.response);
    }
  },
  request: {
    add: async (team_id) => {
      try {
        const res = await axios.patch(`/api/team/request/add`, {team_id});
        return handleResponse(res);
      }
      catch (err) {
        return handleResponse(err.response);
      }
    },
    delete: async (team_id, user_id = null) => {
      try {
        const res = await axios.patch(`/api/team/request/delete`, {team_id, user_id});
        return handleResponse(res);
      }
      catch (err) {
        return handleResponse(err.response);
      }
    }
  },
  member: {
    add: async (team_id, user_id) => {
      try {
        const res = await axios.patch(`/api/team/member/add`, {team_id, user_id});
        return handleResponse(res);
      }
      catch (err) {
        return handleResponse(err.response);
      }
    },
    delete: async (team_id, user_id) => {
      try {
        const res = await axios.patch(`/api/team/member/delete`, {team_id, user_id});
        return handleResponse(res);
      }
      catch (err) {
        return handleResponse(err.response);
      }
    }
  }
}