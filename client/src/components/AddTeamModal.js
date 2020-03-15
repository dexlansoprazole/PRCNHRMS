import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import teamActions from '../actions/team';

const AddTeamModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const addTeam = (user_id, newTeam) => dispatch(teamActions.add(user_id, newTeam));

  const [newTeam, setNewTeam] = useState({
    name: "",
  });

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setNewTeam({
      ...newTeam,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity() === true) {
      addTeam(user._id, newTeam);
      window.$('#addTeamModal').modal('hide');
    }
    else
      evt.target.classList.add('was-validated');
  }

  useEffect(() => {
    window.$('#addTeamModal').on('hidden.bs.modal', function(e) {
      setNewTeam({
        name: ""
      })
      window.$(this).find('form').removeClass('was-validated');
    })
  });

  return (
    <div className="modal fade" id="addTeamModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">建立戰隊</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputName">戰隊名稱</label>
                <input type="text" className="form-control" id="inputName" name="name" onChange={handleChange} value={newTeam.name} required></input>
                <div className="invalid-feedback">必填</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" className="btn btn-success">建立</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeamModal;