import React, {useEffect, useState} from 'react';
var moment = require('moment');

const AddMemberModal = (props) => {
  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
    team: props.team_id,
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
      props.addMember(newMember);
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
        team: props.team_id,
        join_date: moment().format("YYYY/MM/DD")
      })
      window.$(this).find('form').removeClass('was-validated');
    })
  });

  return (
    <div className="modal fade" id="addMemberModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">新增成員</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputID">ID</label>
                <input type="text" className="form-control" id="inputID" name="id" onChange={handleChange} value={newMember.id} required pattern="\d{9}"></input>
                <div className="invalid-feedback">必須為9位數字</div>
              </div>
              <div className="form-group">
                <label htmlFor="inputName">暱稱</label>
                <input type="text" className="form-control" id="inputName" name="name" onChange={handleChange} value={newMember.name} required></input>
                <div className="invalid-feedback">必填</div>
              </div>
              <div className="form-group">
                <label htmlFor="inputJoinDate">加入日期</label>
                <input type="text" className="form-control" id="inputJoinDate" name="join_date" onChange={handleChange} value={newMember.join_date} required pattern="([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))"></input>
                <div className="invalid-feedback">YYYY/MM/DD</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" className="btn btn-success">新增</button>
                {/* data-dismiss="modal" */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;