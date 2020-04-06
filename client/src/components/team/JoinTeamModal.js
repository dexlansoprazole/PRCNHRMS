import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import teamActions from '../../actions/team';

const JoinTeamModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const addTeam = (newTeam) => dispatch(teamActions.addTeam(newTeam));

  const [inputTeamName, setInputTeamName] = useState('');

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
          <div className="modal-header">
            <h5 className="modal-title">加入戰隊</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div class="form-row">
              <div class="col">
                <input type="text" className="form-control" name="name" onChange={handleChange} value={inputTeamName} required placeholder='戰隊名稱'></input>
              </div>
              <div class="col-auto">
                <button type="button" className="btn btn-primary">搜尋</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinTeamModal;