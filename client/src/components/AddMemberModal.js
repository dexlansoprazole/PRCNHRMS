import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import memberActions from '../actions/member';
var moment = require('moment');

const AddMemberModal = () => {
  const dispatch = useDispatch();
  const addMember = newMember => dispatch(memberActions.addMember(newMember));
  const team = useSelector(state => state.team);

  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    team: team._id,
    join_date: moment().format("YYYY/MM/DD")
  });

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setNewMember({
      ...newMember,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity() === true) {
      addMember(newMember);
      window.$('#addMemberModal').modal('hide');
    }
    else
      evt.target.classList.add('was-validated');
  }

  useEffect(() => {
    window.$('#addMemberModal').on('hidden.bs.modal', function(e) {
      setNewMember({
        id: "",
        name: "",
        team: team._id,
        join_date: moment().format("YYYY/MM/DD")
      })
      window.$(this).find('form').removeClass('was-validated');
    })
  });

  return (
    <div className="modal fade" id="addMemberModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-light">
            <h5 className="modal-title">新增成員</h5>
            <button type="button" className="close text-light" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label>ID</label>
                <input type="text" className="form-control" name="id" onChange={handleChange} value={newMember.id} required pattern="\d{9}"></input>
                <div className="invalid-feedback">必須為9位數字</div>
              </div>
              <div className="form-group">
                <label>暱稱</label>
                <input type="text" className="form-control" name="name" onChange={handleChange} value={newMember.name} required></input>
                <div className="invalid-feedback">必填</div>
              </div>
              <div className="form-group">
                <label>加入日期</label>
                <input type="text" className="form-control" name="join_date" onChange={handleChange} value={newMember.join_date} required pattern="([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))"></input>
                <div className="invalid-feedback">YYYY/MM/DD</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" className="btn btn-primary">新增</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;