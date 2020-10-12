import memberService from '../services/memberService';
import {actionTypes} from '../constants';

const getMembers = (query = null) => {
  return {
    types: [actionTypes.GET_MEMBERS_REQUEST, actionTypes.GET_MEMBERS_SUCCESS, actionTypes.GET_MEMBERS_FAILURE],
    callAPI: () => memberService.query(query)
  }
}

const addMember = (newMember) => {
  return {
    types: [actionTypes.ADD_MEMBER_REQUEST, actionTypes.ADD_MEMBER_SUCCESS, actionTypes.ADD_MEMBER_FAILURE],
    callAPI: () => memberService.add(newMember)
  }
}

const patchMember = (id, data) => {
  return {
    types: [actionTypes.PATCH_MEMBER_REQUEST, actionTypes.PATCH_MEMBER_SUCCESS, actionTypes.PATCH_MEMBER_FAILURE],
    callAPI: () => memberService.patchOne(id, data)
  }
}

const patchMembers = (members) => {
  return {
    types: [actionTypes.PATCH_MEMBERS_REQUEST, actionTypes.PATCH_MEMBERS_SUCCESS, actionTypes.PATCH_MEMBERS_FAILURE],
    callAPI: () => memberService.patch(members)
  }
}

const deleteMember = (id) => {
  return {
    types: [actionTypes.DELETE_MEMBER_REQUEST, actionTypes.DELETE_MEMBER_SUCCESS, actionTypes.DELETE_MEMBER_FAILURE],
    callAPI: () => memberService.delete(id)
  }
}

const patch_upvote_attendance = (id, data) => {
  return {
    types: [actionTypes.PATCH_MEMBER_REQUEST, actionTypes.PATCH_MEMBER_SUCCESS, actionTypes.PATCH_MEMBER_FAILURE],
    callAPI: () => memberService.patch_upvote_attendance(id, data)
  }
}

const patch_downvote_attendance = (id, data) => {
  return {
    types: [actionTypes.PATCH_MEMBER_REQUEST, actionTypes.PATCH_MEMBER_SUCCESS, actionTypes.PATCH_MEMBER_FAILURE],
    callAPI: () => memberService.patch_downvote_attendance(id, data)
  }
}

export default {
  getMembers,
  addMember,
  deleteMember,
  patchMember,
  patchMembers,
  patch_upvote_attendance,
  patch_downvote_attendance
};