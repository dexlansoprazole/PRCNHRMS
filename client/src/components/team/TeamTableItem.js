import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Edit, Trash2, PlusSquare} from 'react-feather';
import {createUseStyles} from 'react-jss';
import teamActions from '../../actions/team'

const TeamTableItem = props => {
  const dispatch = useDispatch();
  const setTeamClicked = props.setTeamClicked;
  const setTeamSelected = (team) => dispatch(teamActions.setTeamSelected(team));

  const user = useSelector(state => state.auth.user);
  const members = useSelector(state => state.member.members);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    setIsLeader(props.team.leader._id === user._id);
    setIsManager(props.team.managers.find(m => m._id === user._id) ? true : false);
  }, [props, user]);

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
  
  const handleOnClick = (e) => {
    e.stopPropagation();
    setTeamClicked(props.team);
  }

  if (isRedirect) {
    return <Redirect to="/member_management" />;
  }

  return (
    <tr style={{cursor: props.isSearchResult ? 'normal' : 'pointer'}} onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} onClick={
      props.isSearchResult ? null :
        () => {
        setTeamSelected(props.team);
        setIsRedirect(true);
    }}>
      <td className="fit">{props.index}</td>
      <td>{props.team.name}</td>
      <td>{props.team.leader.name}</td>
      <td>{members.filter(m => m.team === props.team._id && !m.leave_date).length + "/30"}</td>
      {
        props.isSearchResult ? null :
        <td>
          {isLeader ? renderBadge('隊長', 'primary') : null}
        </td>
      }
      <td className="fit p-0" style={{verticalAlign: 'middle'}}>
        {isLeader ?
          <button className={classes.btnFunc} data-toggle="modal" data-target="#editTeamModal" style={btnStyles} onClick={handleOnClick}>
            <Edit></Edit>
          </button> :
          null
        }
        {isLeader ?
        <button className={classes.btnFunc} data-toggle="modal" data-target="#deleteTeamModal" style={btnStyles} onClick={handleOnClick}>
          <Trash2></Trash2>
        </button> :
        null
        }
        {!(isLeader || isManager) ?
          <button className={classes.btnFunc} data-toggle="modal" data-target="#" style={btnStyles} onClick={handleOnClick}>
            <PlusSquare></PlusSquare>
          </button> :
          null
        }
      </td>
    </tr>
  );
};

export default TeamTableItem;