import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import memberActions from '../actions/member';

const DeleteMemberModal = () => {
  const dispatch = useDispatch()
  const deleteMember = id => dispatch(memberActions.deleteMember(id));
  const member = useSelector(state => state.member.memberSelected);

  const handleConfirm = () => {
    deleteMember(member._id);
    window.$('#deleteMemberModal').modal('hide');
  }

  return (
    <div className="modal fade" id="deleteMemberModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-light">
            <h5 className="modal-title">刪除成員</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div className="modal-body">
            <h5>確定要刪除"{member.name}"嗎？</h5>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirm}>刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMemberModal;