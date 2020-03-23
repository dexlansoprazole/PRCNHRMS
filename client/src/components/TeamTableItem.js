import React, {useState} from 'react';
import {Trash2} from 'react-feather';
import {createUseStyles} from 'react-jss'

const TeamTableItem = props => {
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
    <tr onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} style={{height: "56px"}}>
      <td className="fit">{props.index}</td>
      <td>{props.team.name}</td>
      <td>???</td>
      <td>???</td>
      <td className="fit">
        <button className={classes.btnFunc} data-toggle="modal" data-target="#" style={btnStyles}><Trash2></Trash2></button>
      </td>
    </tr>
  );
};

export default TeamTableItem;