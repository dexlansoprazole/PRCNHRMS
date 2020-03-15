import memberService from '../services/memberService';
import actionTypes from '../actionTypes';

export const MemberFilters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  LEFT: 'LEFT'
}

const getMembers = (query = null) => {
  return async dispatch => {
    dispatch(request());
    try {
      const members = await memberService.query(query);
      dispatch(success(members));
    } catch (error) {
      dispatch(failure());
    }
  }
  
  function request() {return {type: actionTypes.GET_MEMBERS_REQUEST}}
  function success(members) {return {type: actionTypes.GET_MEMBERS_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.GET_MEMBERS_FAILURE}}
}

const addMember = (newMember) => {
  return async dispatch => {
    dispatch(request());
    try {
      const members = await memberService.add(newMember);
      dispatch(success(members));
    } catch (error) {
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.ADD_MEMBER_REQUEST}}
  function success(members) {return {type: actionTypes.ADD_MEMBER_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.ADD_MEMBER_FAILURE}}
}

const deleteMember = (id) => {
  return async dispatch => {
    dispatch(request());
    try {
      const members = await memberService.delete(id);
      dispatch(success(members));
    } catch (error) {
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.DELETE_MEMBER_REQUEST}}
  function success(members) {return {type: actionTypes.DELETE_MEMBER_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.DELETE_MEMBER_FAILURE}}
}

const patchMember = (id, data) => {
  return async dispatch => {
    dispatch(request());
    try {
      const members = await memberService.patch(id, data);
      dispatch(success(members));
    } catch (error) {
      dispatch(failure());
    }
  }

  function request() {return {type: actionTypes.PATCH_MEMBER_REQUEST}}
  function success(members) {return {type: actionTypes.PATCH_MEMBER_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.PATCH_MEMBER_FAILURE}}
}

const setMemberFilter = (filter) => {
  return {type: actionTypes.SET_MEMBER_FILTER, filter};
}

export default {
  getMembers,
  addMember,
  deleteMember,
  patchMember,
  setMemberFilter
};