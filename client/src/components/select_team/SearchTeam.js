import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Grid, TextField, Button} from '@material-ui/core';
import {actionTypes} from '../../constants';
import teamActions from '../../actions/team';
import TeamTable from './TeamTable';
import LoadingOverlay from '../LoadingOverlay';

const SearchTeam = () => {
  const dispatch = useDispatch();
  const searchTeams = (query) => dispatch(teamActions.searchTeams(query));
  const setSearchTeamResult = (result) => dispatch({type: actionTypes.SET_SEARCH_TEAM_RESULT, result});
  const loading = useSelector(state => state.team.search.loading);
  const myTeams = useSelector(state => state.teams);
  const requests = useSelector(state => state.user.requests);
  const result = useSelector(state => state.team.search.result).filter(t => !(myTeams.find(mt => mt._id === t._id) || requests.find(r => r._id === t._id)));

  const [inputTeamName, setInputTeamName] = useState('');

  useEffect(() => {
    return () => {
      setSearchTeamResult([]);
    };
  }, []);

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    setInputTeamName(value);
  }

  return (
    <Box height='100%' overflow='hidden'>
      <LoadingOverlay loading={loading}></LoadingOverlay>
      <Box p={2}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <TextField size='small' type="text" name="name" onChange={handleChange} value={inputTeamName} label='戰隊名稱' variant="outlined" />
          </Grid>
          <Grid item>
            <Button variant="contained" disableElevation onClick={() => searchTeams({name: inputTeamName})}>搜尋</Button>
          </Grid>
        </Grid>
      </Box>
      <TeamTable teams={result} showFuncs />
    </Box>
  );
}

export default SearchTeam;