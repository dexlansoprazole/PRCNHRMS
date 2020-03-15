import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LoadingModal from './LoadingModal';
import MemberTable from './MemberTable';
import AddMemberModal from './AddMemberModal';
import AddTeamModal from './AddTeamModal';
import memberActions, {MemberFilters} from '../actions/member';

const getVisibleMembers = (members, filter) => {
  switch (filter) {
    case MemberFilters.ALL:
      return members;
    case MemberFilters.ACTIVE:
      return members.filter(m => m.leave_date == null);
    case MemberFilters.LEFT:
      return members.filter(m => m.leave_date != null);
    default:
      return members;
  }
}

const MemberManagement = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.member.loading);
  const isSignedIn = useSelector(state => state.signIn.isSignedIn);
  const team = useSelector(state => state.team);
  const memberFilter = useSelector(state => state.member.memberFilter);
  const members = getVisibleMembers(useSelector(state => state.member.members), memberFilter);

  const onFilterClick = filter => dispatch(memberActions.setMemberFilter(filter));
  const addMember = newMember => dispatch(memberActions.addMember(newMember));
  
  if (loading)
    return (<LoadingModal></LoadingModal>);
  window.$('.modal-backdrop').remove();
  window.$('body').removeClass('modal-open');
  if (isSignedIn && team._id)
    return (
      <div className="container">
        <AddMemberModal addMember={addMember} team_id={team._id}></AddMemberModal>
        <div className="row">
          <div className="col">
            <h1>{team.name + " 成員清單"}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" data-toggle="modal" data-target="#addMemberModal">新增成員</button>
          </div>
          <div className="col text-right">
            <div className="btn-group">
              <button type="button" className={"btn " + (memberFilter === MemberFilters.ACTIVE ? "btn-success" : "btn-secondary")} name={MemberFilters.ACTIVE} onClick={(evt) => onFilterClick(evt.target.name)}>現役成員</button>
              <button type="button" className={"btn " + (memberFilter === MemberFilters.LEFT ? "btn-danger" : "btn-secondary")} name={MemberFilters.LEFT} onClick={(evt) => onFilterClick(evt.target.name)}>已退出</button>
              <button type="button" className={"btn " + (memberFilter === MemberFilters.ALL ? "btn-dark" : "btn-secondary")} name={MemberFilters.ALL} onClick={(evt) => onFilterClick(evt.target.name)}>全部成員</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MemberTable members={members}></MemberTable>
          </div>
        </div>
      </div>
    );
  else if (isSignedIn && !team._id)
    return (
      <div className="container">
        <AddTeamModal></AddTeamModal>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" data-toggle="modal" data-target="#addTeamModal">建立戰隊</button>
          </div>
        </div>
      </div>
    )
  else
    return null;
}
 
export default MemberManagement;