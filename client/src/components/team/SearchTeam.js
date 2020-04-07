import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actionTypes} from '../../constants';
import teamActions from '../../actions/team';
import TeamTable from './TeamTable';
const SearchTeam = () => {
  const dispatch = useDispatch();
  const searchTeams = (query) => dispatch(teamActions.searchTeams(query));
  const setSearchTeamResult = (result) => dispatch({type: actionTypes.SET_SEARCH_TEAM_RESULT, result});
  const loading = useSelector(state => state.team.search.loading);
  const myTeams = useSelector(state => state.team.teams);
  const requests = useSelector(state => state.auth.user.requests);
  const result = useSelector(state => state.team.search.result).filter(t => !(myTeams.find(mt => mt._id === t._id) || requests.find(r => r._id === t._id)));

  const [inputTeamName, setInputTeamName] = useState('');

  useEffect(() => {
    setSearchTeamResult([]);
  }, []);

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    setInputTeamName(value);
  }

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <input type="text" className="form-control" name="name" onChange={handleChange} value={inputTeamName} placeholder='戰隊名稱'></input>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-primary" onClick={() => searchTeams({name: inputTeamName})}>搜尋</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TeamTable teams={result} loading={loading}></TeamTable>
        </div>
      </div>
    </div>
  );
}

export default SearchTeam;