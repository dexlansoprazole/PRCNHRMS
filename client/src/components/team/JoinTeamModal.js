import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import teamActions from '../../actions/team';
import LoadingOverlay from '../LoadingOverlay';
import TeamTable from './TeamTable';

const JoinTeamModal = () => {
  const dispatch = useDispatch();
  const searchTeams = (query) => dispatch(teamActions.searchTeams(query));
  const loading = useSelector(state => state.team.search.loading);
  const myTeams = useSelector(state => state.team.teams);
  const result = useSelector(state => state.team.search.result).filter(t => !myTeams.find(mt => mt._id === t._id));

  const [inputTeamName, setInputTeamName] = useState('');
  const [teamClicked, setTeamClicked] = useState({});

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    setInputTeamName(value);
  }

  useEffect(() => {
    window.$('#joinTeamModal').on('hidden.bs.modal', function(e) {
      setInputTeamName('')
    })
  });

  return (
    <div className="modal fade" id="joinTeamModal">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <LoadingOverlay loading={loading}></LoadingOverlay>
          <div className="modal-header">
            <h5 className="modal-title">加入戰隊</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" name="name" onChange={handleChange} value={inputTeamName} required placeholder='戰隊名稱'></input>
              </div>
              <div className="col-auto">
                <button type="button" className="btn btn-primary" onClick={() => searchTeams({name: inputTeamName})}>搜尋</button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TeamTable teams={result} setTeamClicked={setTeamClicked} isSearchResult></TeamTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinTeamModal;