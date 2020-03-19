import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import memberActions from '../actions/member';
import {Edit, LogOut, Trash2} from 'react-feather';
import {createUseStyles} from 'react-jss'

var moment = require('moment');

const MemberTableItem = props => {
  const dispatch = useDispatch();
  const setMemberSelected = member => dispatch(memberActions.setMemberSelected(member));

  const [isHovered, setIsHovered] = useState(false);

  const btnStyles = {
    opacity: isHovered ? 1 : 0
  }

  const classes = createUseStyles({
    btnFunc: {
      transition: "opacity .2s",
      backgroundColor: "transparent",
      border: 0,
      padding: "0px",
      margin: "0px 8px 0px 8px",
      '&:focus': {
        outline: 'none',
        boxShadow: 'none'
      }
    }
  })();

  return (
    <tr onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} style={{height: "56px", backgroundColor: isHovered ? "#f2f2f2" : ""}}>
      <td className="fit">{props.index}</td>
      <td className="fit">{props.member.id}</td>
      <td>{props.member.name}</td>
      <td>{moment(props.member.join_date).format('YYYY/MM/DD')}</td>
      <td>{props.member.leave_date ? moment(props.member.leave_date).format('YYYY/MM/DD') : "-"}</td>
      <td>{props.member.kick_reason ? props.member.kick_reason : "-"}</td>
      <td className="fit">
          <button className={classes.btnFunc} data-toggle="modal" data-target="#editMemberModal" style={btnStyles} onClick={() => setMemberSelected(props.member)}><Edit></Edit></button>
          {
            !props.member.leave_date ?
              <button className={classes.btnFunc} data-toggle="modal" data-target="#kickMemberModal" style={btnStyles} onClick={() => setMemberSelected(props.member)}><LogOut></LogOut></button> :
              ""
          }
          <button className={classes.btnFunc} data-toggle="modal" data-target="#deleteMemberModal" style={btnStyles} onClick={() => setMemberSelected(props.member)}><Trash2></Trash2></button>
      </td>
    </tr>
  );
};

export default MemberTableItem;