import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MemberTable from './MemberTable';
import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import KickMemberModal from './KickMemberModal';
import DeleteMemberModal from './DeleteMemberModal';
import AddTeamModal from './AddTeamModal';
import memberActions from '../actions/member';
import {memberFilters} from '../constants';

const getVisibleMembers = (members, filter) => {
  switch (filter) {
    case memberFilters.ALL:
      return members;
    case memberFilters.ACTIVE:
      return members.filter(m => m.leave_date == null);
    case memberFilters.LEFT:
      return members.filter(m => m.leave_date != null);
    default:
      return members;
  }
}

const MemberManagement = () => {
  const dispatch = useDispatch();
  const onFilterClick = filter => dispatch(memberActions.setMemberFilter(filter));
  const isSignedIn = useSelector(state => state.signIn.isSignedIn);
  const team = useSelector(state => state.team);
  const memberFilter = useSelector(state => state.member.memberFilter);
  const members = getVisibleMembers(useSelector(state => state.member.members), memberFilter);

  

  if (isSignedIn && team._id)
    return (
      <div className="container">
        <AddMemberModal></AddMemberModal>
        <EditMemberModal></EditMemberModal>
        <KickMemberModal></KickMemberModal>
        <DeleteMemberModal></DeleteMemberModal>
        <div className="row">
          <div className="col">
            <h1 id="title">{team.name}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" id="btnAddMember" data-toggle="modal" data-target="#addMemberModal">新增成員</button>
          </div>
          <div className="col text-right">
            <div className="btn-group" id="btnGroupFilter">
              <button type="button" id="btnFilterActive" className={"btn " + (memberFilter === memberFilters.ACTIVE ? "btn-success" : "btn-secondary")} name={memberFilters.ACTIVE} onClick={(evt) => onFilterClick(evt.target.name)}>現役成員</button>
              <button type="button" id="btnFilterLeft" className={"btn " + (memberFilter === memberFilters.LEFT ? "btn-danger" : "btn-secondary")} name={memberFilters.LEFT} onClick={(evt) => onFilterClick(evt.target.name)}>已退出</button>
              <button type="button" id="btnFilterAll" className={"btn " + (memberFilter === memberFilters.ALL ? "btn-dark" : "btn-secondary")} name={memberFilters.ALL} onClick={(evt) => onFilterClick(evt.target.name)}>全部成員</button>
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
            <button className="btn btn-primary" id="btnAddTeam" data-toggle="modal" data-target="#addTeamModal">建立戰隊</button>
          </div>
        </div>
      </div>
    )
  else
    return null;
}
 
export default MemberManagement;