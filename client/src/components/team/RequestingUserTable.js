import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@material-ui/core';
import {Check} from '@material-ui/icons';
import {useDispatch} from 'react-redux';
import UserTable from '../UserTable';
import teamActions from '../../actions/team';

const RequestingUserTable = (props) => {
  const team = props.team;
  const role = props.role;
  const users = team.users.requests;
  const dispatch = useDispatch();
  const addMember = (team_id, user_id) => dispatch(teamActions.addMember(team_id, user_id));
  const deleteJoinRequest = async (team_id, user_id) => dispatch(teamActions.deleteJoinRequest(team_id, user_id));

  const actionConfirm = role === 'leader' || role === 'manager' ? {
    icon: Check,
    tooltip: '認可',
    onClick: (event, rowData) => {
      addMember(team._id, rowData._id);
    }
  } : null;

  const handleDeny = oldData =>
    new Promise(async (resolve, reject) => {
      await deleteJoinRequest(team._id, oldData._id);
      resolve();
    })

  const data = users

  const columns = [
    // {
    //   title: "",
    //   render: rowData => <Avatar src={rowData.pictureUrl} />,
    //   cellStyle: {
    //     padding: '12px'
    //   },
    //   width: '1%'
    // },
    {title: "名稱", field: "name"},
    // {title: "電子信箱", field: "email"},
  ]

  return (
    <UserTable
      data={data}
      columns={columns}
      loadingOn={['ADD_TEAM_MEMBER', 'PATCH_USER']}
      actions={[actionConfirm]}
      editable={{
        isDeleteHidden: rowData => role !== 'leader' && role !== 'manager',
        onRowDelete: handleDeny,
      }}
      deleteTooltip='拒絕'
      deleteText='確定要拒絕此申請?'
    />
  );
}

RequestingUserTable.propTypes = {
  team: PropTypes.object,
  role: PropTypes.string,
  toolbar: PropTypes.bool
};

export default RequestingUserTable;
