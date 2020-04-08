import React from 'react';
import { useDispatch } from 'react-redux';
import teamActions from '../../actions/team';

const DeleteTeamModal = (props) => {
  const dispatch = useDispatch()
  const deleteTeam = id => dispatch(teamActions.deleteTeam(id));
  const teamSelected = props.teamSelected;

  const handleConfirm = () => {
    deleteTeam(teamSelected._id);
    window.$('#deleteTeamModal').modal('hide');
  }

  return (
    <div className="modal fade" id="deleteTeamModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger text-light">
            <h5 className="modal-title">刪除戰隊</h5>
              <button type="button" className="close text-light" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div className="modal-body">
            <h5>確定要刪除"{teamSelected.name}"嗎？</h5>
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

export default DeleteTeamModal;