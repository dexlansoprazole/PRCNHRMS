import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Trash2} from 'react-feather';
import {createUseStyles} from 'react-jss';

const TeamTableItem = props => {
  const setTeamSelected = props.setTeamSelected;

  const user = useSelector(state => state.auth.user);
  const members = useSelector(state => state.member.members);
  
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

  const renderBadge = (text, color) => {
    return (
      <span className={"badge badge-pill badge-" + color}>{text}</span>
    )
  }

  return (
    <tr onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} style={{height: "56px"}}>
      <td className="fit">{props.index}</td>
      <td>{props.team.name}</td>
      <td>???</td>
      <td>{members.filter(m => m.team === props.team._id && !m.leave_date).length + "/30"}</td>
      <td>
        {props.team.leader === user._id ? renderBadge('隊長', 'primary') : null}
      </td>
      <td className="fit">
        <button className={classes.btnFunc} data-toggle="modal" data-target="#deleteTeamModal" style={btnStyles} onClick={() => setTeamSelected(props.team)}><Trash2></Trash2></button>
      </td>
    </tr>
  );
};

export default TeamTableItem;