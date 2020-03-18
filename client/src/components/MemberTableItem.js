import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import memberActions from '../actions/member';

var moment = require('moment');

const MemberTableItem = props => {
  const dispatch = useDispatch();
  const setMemberSelected = member => dispatch(memberActions.setMemberSelected(member));

  const [isHovered, setIsHovered] = useState(false);

  const deleteButtonStyle = {
    opacity: isHovered ? 1 : 0,
    transition: "opacity .2s"
  };

  return (
    <tr onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} style={{height: "56px", backgroundColor: isHovered ? "#f2f2f2" : ""}}>
      <td className="fit">{props.index}</td>
      <td className="fit">{props.member.id}</td>
      <td>{props.member.name}</td>
      <td>{moment(props.member.join_date).format('YYYY/MM/DD')}</td>
      <td>{props.member.leave_date ? moment(props.member.leave_date).format('YYYY/MM/DD') : "-"}</td>
      <td>{props.member.kick_reason ? props.member.kick_reason : "-"}</td>
      <td className="fit">{
        !props.member.leave_date ?
          <button className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target="#kickMemberModal" style={deleteButtonStyle} onClick={() => setMemberSelected(props.member)}>踢除</button> :
          ""
      }
      </td>
    </tr>
  );
};

export default MemberTableItem;