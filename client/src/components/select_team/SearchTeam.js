import React from 'react';
import {Add} from '@material-ui/icons';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Grid, TextField, Button} from '@material-ui/core';
import {actionTypes} from '../../constants';
import teamActions from '../../actions/team';
import TeamTable from './TeamTable';

const SearchTeam = () => {
  const dispatch = useDispatch();
  const searchTeams = (query) => dispatch(teamActions.searchTeams(query));
  const setSearchTeamResult = (result) => dispatch({type: actionTypes.SET_SEARCH_TEAM_RESULT, result});
  const addJoinRequest = (id) => dispatch(teamActions.addJoinRequest(id));
  const myTeams = useSelector(state => state.teams);
  const requests = useSelector(state => state.user.requests);
  const result = useSelector(state => state.team.search.result).filter(t => !(myTeams.find(mt => mt._id === t._id) || requests.find(r => r._id === t._id)));
  const [inputTeamName, setInputTeamName] = React.useState('');

  React.useEffect(() => {
    return () => {
      setSearchTeamResult([]);
    };
  }, []);

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    setInputTeamName(value);
  }

  const actionAddJoinRequest = {
    icon: Add,
    tooltip: '申請加入',
    onClick: (event, rowData) => {
      addJoinRequest(rowData.teamData._id);
    }
  }

  const data = result.map((t, i) => {
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
    <Box height='100%' overflow='hidden'>
      <Box p={2}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <TextField size='small' type="text" name="name" onChange={handleChange} value={inputTeamName} label='戰隊名稱' variant="outlined" />
          </Grid>
          <Grid item>
            <Button variant="contained" color='primary' disableElevation onClick={() => searchTeams({name: inputTeamName})}>搜尋</Button>
          </Grid>
        </Grid>
      </Box>
      <TeamTable
        data={data}
        columns={columns}
        actions={[actionAddJoinRequest]}
        toolbar={false}
        maxBodyHeight='calc(50vh - 120px)'
      />
    </Box>
  );
}

export default SearchTeam;