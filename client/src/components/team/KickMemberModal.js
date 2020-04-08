import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import memberActions from '../../actions/member';

var moment = require('moment');

const KickMemberModal = (props) => {
  const dispatch = useDispatch();
  const patchMember = (id, data) => dispatch(memberActions.patchMember(id, data));
  const member = props.member;

  const [kickData, setKickData] = useState({
    kick_reason: "",
    leave_date: moment().format('YYYY/MM/DD')
  });

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setKickData({
      ...kickData,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.checkValidity() === true) {
      patchMember(member._id, kickData);
      window.$('#kickMemberModal').modal('hide');
    }
    else
      evt.target.classList.add('was-validated');
  }

  window.$('#kickMemberModal').on('hidden.bs.modal', function(e) {
    setKickData({
      kick_reason: "",
      leave_date: moment().format('YYYY/MM/DD')
    })
    window.$(this).find('form').removeClass('was-validated');
  })

  return (
    <div className="modal fade" id="kickMemberModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-warning">
            <h5 className="modal-title">踢除成員</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label>踢除原因</label>
                <input type="text" className="form-control" name="kick_reason" onChange={handleChange} value={kickData.kick_reason}></input>
              </div>
              <div className="form-group">
                <label>踢除日期</label>
                <input type="text" className="form-control" name="leave_date" onChange={handleChange} value={kickData.leave_date} required pattern="([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))"></input>
                <div className="invalid-feedback">YYYY/MM/DD</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" className="btn btn-warning">踢除</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KickMemberModal;