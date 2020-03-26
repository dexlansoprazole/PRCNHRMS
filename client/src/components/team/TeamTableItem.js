import React, {useState} from 'react';
import {useSelector} from 'react-redux';
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
      border: '1px solid transparent',
      borderRadius: 4,
      padding: "4px",
      margin: "0px 8px 0px 8px",
      '&:focus': {
        outline: 'none',
        boxShadow: 'none'
      },
      '&:hover': {
        border: '1px solid #ccc',
        backgroundColor: '#ddd'
      }
    }
  })();

  const renderBadge = (text, color) => {
    return (
      <span className={"badge badge-pill badge-" + color}>{text}</span>
    )
  }

  return (
    <tr onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}}>
      <td className="fit">{props.index}</td>
      <td>{props.team.name}</td>
      <td>{props.team.leader.email}</td>
      <td>{members.filter(m => m.team === props.team._id && !m.leave_date).length + "/30"}</td>
      <td>
        {props.team.leader._id === user._id ? renderBadge('隊長', 'primary') : null}
      </td>
      <td className="fit p-0" style={{verticalAlign: 'middle'}}>
        <button className={classes.btnFunc} data-toggle="modal" data-target="#deleteTeamModal" style={btnStyles} onClick={() => setTeamSelected(props.team)}><Trash2></Trash2></button>
      </td>
    </tr>
  );
};

export default TeamTableItem;