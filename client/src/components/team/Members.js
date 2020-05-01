import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import MemberTable from './MemberTable';
import AddMemberModal from './AddMemberModal';
import EditMemberModal from './EditMemberModal';
import KickMemberModal from './KickMemberModal';
import DeleteMemberModal from './DeleteMemberModal';

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

const memberFilters = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  LEFT: 'LEFT'
}

const Members = (props) => {
  const {team_id} = useParams();
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const team = useSelector(state => state.teams).find(t => t._id === team_id);
  const [memberFilter, setMemberFilter] = useState(memberFilters.ACTIVE);
  const [memberClicked, setMemberClicked] = useState({});

  if (isSignedIn && team)
    return (
      <div>
        <AddMemberModal team={team}></AddMemberModal>
        <EditMemberModal member={memberClicked}></EditMemberModal>
        <KickMemberModal member={memberClicked}></KickMemberModal>
        <DeleteMemberModal member={memberClicked}></DeleteMemberModal>
        <div className="row">
          {
            props.role === 'leader' || props.role === 'manager' ? 
            <div className="col">
              <button className="btn btn-primary" id="btnAddMember" data-toggle="modal" data-target="#addMemberModal">新增成員</button>
            </div> :
            null
          }
          <div className="col text-right">
            <div className="btn-group" id="btnGroupFilter">
              <button type="button" id="btnFilterActive" className={"btn " + (memberFilter === memberFilters.ACTIVE ? "btn-success" : "btn-secondary")} name={memberFilters.ACTIVE} onClick={(evt) => setMemberFilter(evt.target.name)}>現役成員</button>
              <button type="button" id="btnFilterLeft" className={"btn " + (memberFilter === memberFilters.LEFT ? "btn-danger" : "btn-secondary")} name={memberFilters.LEFT} onClick={(evt) => setMemberFilter(evt.target.name)}>已退出</button>
              <button type="button" id="btnFilterAll" className={"btn " + (memberFilter === memberFilters.ALL ? "btn-dark" : "btn-secondary")} name={memberFilters.ALL} onClick={(evt) => setMemberFilter(evt.target.name)}>全部成員</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MemberTable members={getVisibleMembers(team.members, memberFilter)} setMemberClicked={setMemberClicked} role={props.role}></MemberTable>
          </div>
        </div>
      </div>
    );
  else
    return null;
}

export default Members;