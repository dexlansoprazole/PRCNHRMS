import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import memberActions from '../actions/member';
var moment = require('moment');

const EditMemberModal = () => {
  const dispatch = useDispatch();
  const patchMember = (id, memberData) => dispatch(memberActions.patchMember(id, memberData));
  const member = useSelector(state => state.member.memberSelected);
  const [memberData, setMemberData] = useState({});

  useEffect(() => {
    setMemberData({
      id: member.id,
      name: member.name,
      join_date: member.join_date ? moment(member.join_date).format("YYYY/MM/DD") : undefined,
      leave_date: member.leave_date ? moment(member.leave_date).format("YYYY/MM/DD") : undefined,
      kick_reason: member.kick_reason
    })
  }, [member]);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setMemberData({
      ...memberData,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity() === true) {
      patchMember(member._id, memberData);
      window.$('#editMemberModal').modal('hide');
    }
    else
      evt.target.classList.add('was-validated');
  }

  useEffect(() => {
    window.$('#editMemberModal').on('hidden.bs.modal', function(e) {
      setMemberData({
        id: member.id,
        name: member.name,
        join_date: member.join_date ? moment(member.join_date).format("YYYY/MM/DD") : undefined,
        leave_date: member.leave_date ? moment(member.leave_date).format("YYYY/MM/DD") : undefined,
        kick_reason: member.kick_reason
      });
      window.$(this).find('form').removeClass('was-validated');
    })
  });

  return (
    <div className="modal fade" id="editMemberModal">
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
                <label>ID</label>
                <input type="text" className="form-control" name="id" onChange={handleChange} value={memberData.id || ''} required pattern="\d{9}"></input>
                <div className="invalid-feedback">必須為9位數字</div>
              </div>
              <div className="form-group">
                <label>暱稱</label>
                <input type="text" className="form-control" name="name" onChange={handleChange} value={memberData.name || ''} required></input>
                <div className="invalid-feedback">必填</div>
              </div>
              <div className="form-group">
                <label>加入日期</label>
                <input type="text" className="form-control" name="join_date" onChange={handleChange} value={memberData.join_date || ''} required pattern="([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))"></input>
                <div className="invalid-feedback">YYYY/MM/DD</div>
              </div>
              <div className="form-group">
                <label>退出日期</label>
                <input type="text" className="form-control" name="leave_date" onChange={handleChange} value={memberData.leave_date || ''} required={memberData.kick_reason ? true : false} pattern="([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))"></input>
                <div className="invalid-feedback">YYYY/MM/DD</div>
              </div>
              <div className="form-group">
                <label>踢除原因</label>
                <input type="text" className="form-control" name="kick_reason" onChange={handleChange} value={memberData.kick_reason || ''}></input>
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

export default EditMemberModal;