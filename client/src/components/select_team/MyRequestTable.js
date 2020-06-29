import React from 'react';
import PropTypes from 'prop-types';
import {Close} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import TeamTable from './TeamTable';
import teamActions from '../../actions/team';
import deepEqual from 'deep-equal';

const MyRequestTeamTable = props => {
  const requests = useSelector(state => state.user.requests);
  const dispatch = useDispatch();
  const deleteJoinRequest = (id) => dispatch(teamActions.deleteJoinRequest(id));

  const actionDeleteJoinRequest = {
    icon: Close,
    tooltip: '取消申請',
    onClick: (event, rowData) => {
      deleteJoinRequest(rowData.teamData._id);
    }
  }

  const data = requests.map((t, i) => {
    let team = {
      name: t.name,
      leader: t.users.leader.name,
      member_count: t.members.filter(m => m.leave_date == null).length + "/30",
      teamData: t
    }
    return team;
  });

  const columns = [
    {title: "#", render: rowData => rowData ? rowData.tableData.id + 1 : '', width: '1%'},
    {title: "名稱", field: "name"},
    {title: "隊長", field: "leader"},
    {title: "成員數", field: "member_count"},
  ]

  return (
    <TeamTable
      data={data}
      columns={columns}
      actions={[actionDeleteJoinRequest]}
      toolbar={props.toolbar}
    />
  );
}

MyRequestTeamTable.defaultProps = {
  toolbar: PropTypes.bool
}

export default React.memo(MyRequestTeamTable, (prevProps, nextProps) => deepEqual(prevProps, nextProps));