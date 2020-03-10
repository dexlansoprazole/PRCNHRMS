import memberService from '../services/memberService';
import actionTypes from '../actionTypes';

export const MemberFilters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  LEFT: 'LEFT'
}

const getMembers = (query = null) => {
  return dispatch => {
    dispatch(request());
    memberService.query(query).then(
      members => {
        dispatch(success(members));
      },
      error => {
        dispatch(failure());
      }
    );
  }
  
  function request() {return {type: actionTypes.GET_MEMBERS_REQUEST}}
  function success(members) {return {type: actionTypes.GET_MEMBERS_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.GET_MEMBERS_FAILURE}}
}

const addMember = (newMember) => {
  return dispatch => {
    dispatch(request());
    memberService.add(newMember).then(
      members => {
        dispatch(success(members));
      },
      error => {
        dispatch(failure());
      }
    );
  }

  function request() {return {type: actionTypes.ADD_MEMBER_REQUEST}}
  function success(members) {return {type: actionTypes.ADD_MEMBER_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.ADD_MEMBER_FAILURE}}
}

const deleteMember = (id) => {
  return dispatch => {
    dispatch(request());
    memberService.delete(id).then(
      members => {
        dispatch(success(members));
      },
      error => {
        dispatch(failure());
      }
    );
  }

  function request() {return {type: actionTypes.DELETE_MEMBER_REQUEST}}
  function success(members) {return {type: actionTypes.DELETE_MEMBER_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.DELETE_MEMBER_FAILURE}}
}

const patchMember = (id, data) => {
  return dispatch => {
    dispatch(request());
    memberService.patch(id, data).then(
      members => {
        dispatch(success(members));
      },
      error => {
        dispatch(failure());
      }
    );
  }

  function request() {return {type: actionTypes.PATCH_MEMBER_REQUEST}}
  function success(members) {return {type: actionTypes.PATCH_MEMBER_SUCCESS, members: members}}
  function failure() {return {type: actionTypes.PATCH_MEMBER_FAILURE}}
}

const setMemberFilter = (filter) => {
  return {type: actionTypes.SET_MEMBER_FILTER, filter};
}

export const memberManagementActions = {
  getMembers,
  addMember,
  deleteMember,
  patchMember,
  setMemberFilter
};