import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import teamActions from '../../actions/team';

const EditTeamModal = (props) => {
  const dispatch = useDispatch();
  const patchTeam = (id, teamData) => dispatch(teamActions.patchTeam(id, teamData));
  const team = props.teamSelected;
  const [teamData, setTeamData] = useState({});

  useEffect(() => {
    setTeamData({
      name: team.name
    })
  }, [team]);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setTeamData({
      ...teamData,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity() === true) {
      patchTeam(team._id, teamData);
      window.$('#editTeamModal').modal('hide');
    }
    else
      evt.target.classList.add('was-validated');
  }

  useEffect(() => {
    window.$('#editTeamModal').on('hidden.bs.modal', function(e) {
      setTeamData({
        name: team.name
      });
      window.$(this).find('form').removeClass('was-validated');
    })
  });

  return (
    <div className="modal fade" id="editTeamModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-light">
            <h5 className="modal-title">編輯成員</h5>
            <button type="button" className="close text-light" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label>戰隊名稱</label>
                <input type="text" className="form-control" name="name" onChange={handleChange} value={teamData.name || ''} required></input>
                <div className="invalid-feedback">必填</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" className="btn btn-primary">確認</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeamModal;