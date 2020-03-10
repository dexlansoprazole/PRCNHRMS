import React from 'react';
import MemberTable from './MemberTable';
import AddMemberModal from './AddMemberModal';
import {MemberFilters} from '../actions/memberManagement';

const MemberManagement = (props) => {
  return (
    <div className="container">
      <AddMemberModal addMember={props.addMember}></AddMemberModal>
      <div className="row">
        <div className="col">
          <h1>成員清單</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" data-toggle="modal" data-target="#addMemberModal">新增成員</button>
        </div>
        <div className="col text-right">
          <div className="btn-group">
            <button type="button" className={"btn " + (props.memberFilter === MemberFilters.ACTIVE ? "btn-success" : "btn-secondary")} name={MemberFilters.ACTIVE} onClick={(evt) => props.onFilterClick(evt.target.name)}>現役成員</button>
            <button type="button" className={"btn " + (props.memberFilter === MemberFilters.LEFT ? "btn-danger" : "btn-secondary")} name={MemberFilters.LEFT} onClick={(evt) => props.onFilterClick(evt.target.name)}>已退出</button>
            <button type="button" className={"btn " + (props.memberFilter === MemberFilters.ALL ? "btn-dark" : "btn-secondary")} name={MemberFilters.ALL} onClick={(evt) => props.onFilterClick(evt.target.name)}>全部成員</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <MemberTable members={props.members} patchMember={props.patchMember}></MemberTable>
        </div>
      </div>
    </div>
  );
}
 
export default MemberManagement;