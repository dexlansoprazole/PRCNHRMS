import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import {X} from 'react-feather';
import UserItem from './UserItem';
import teamActions from '../../actions/team';

const Permissions = () => {
  const {team_id} = useParams();
  const team = useSelector(state => state.teams).find(t => t._id === team_id);
  const users = [{...team.users.leader, role: 'leader'}].concat(team.users.managers.map(m => ({...m, role: 'manager'})), team.users.members.map(m => ({...m, role: 'member'})));
  const [showModal, setShowModal] = useState(false);
  const [userClicked, setUserClicked] = useState(null);
  const dispatch = useDispatch();
  const deleteMember = () => dispatch(teamActions.deleteMember(team_id, userClicked._id));

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="bg-danger text-light" closeButton>
          <Modal.Title>踢除成員</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{'確定要踢除 ' + (userClicked != null ? userClicked.name : null) + ' 嗎?'}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>取消</Button>
          <Button variant="danger" onClick={() => {deleteMember(); setShowModal(false);}}>確定</Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col">
          <div className="list-group">
            {users.map(r =>
              <UserItem key={r._id} user={r} buttons={<Button variant="outline-danger" style={{padding: 4, height: 36, width: 36}} onClick={() => {setUserClicked(r); setShowModal(true);}}><X></X></Button>}></UserItem>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Permissions;
