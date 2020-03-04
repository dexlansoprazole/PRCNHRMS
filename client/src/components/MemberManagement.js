import React, {useState, useEffect} from 'react';
import memberService from '../services/memberService';

var $ = require('jquery')
var moment = require('moment');

const MemberManagement = () => {
  const querys = {
    active: {
      leave_date: {$exists: false}
    },
    left: {
      leave_date: {$exists: true}
    },
    all:{}
  }
  const [members, setMembers] = useState(null);
  const [query, setQuery] = useState(querys.active);

  useEffect(() => {
    if (!members) {
      getMembers();
    }
  })

  useEffect(() => {
    getMembers();
  }, [query])

  const getMembers = async () => {
    let res = await memberService.query(query);
    console.log(res);
    setMembers(res);
  }

  const addMember = async (newMember) => {
    let res = await memberService.add(newMember);
    console.log(res);
    getMembers();
  }

  const deleteMember = async (id) => {
    let res = await memberService.delete(id);
    console.log(res);
    getMembers();
  }

  const patchMember = async (id, data) => {
    let res = await memberService.patch(id, data);
    console.log(res);
    getMembers();
  }

  const handleQueryChange = (evt) => {
    const target = evt.target;
    const name = target.name;

    setQuery(querys[name]);
  }

  return (
    <div className="container">
      <AddMemberModal addMember={addMember}></AddMemberModal>
      <div className="row">
        <div className="col">
          <h1>成員清單</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" data-toggle="modal" data-target="#addMemberModal">新增成員</button>
        </div>
        <div className="col text-right">
          <div className="btn-group">
            <button type="button" className={"btn " + (JSON.stringify(query) === JSON.stringify(querys.active) ? "btn-success" : "btn-secondary")} name="active" onClick={handleQueryChange}>現役成員</button>
            <button type="button" className={"btn " + (JSON.stringify(query) === JSON.stringify(querys.left) ? "btn-danger" : "btn-secondary")} name="left" onClick={handleQueryChange}>已踢除</button>
            <button type="button" className={"btn " + (JSON.stringify(query) === JSON.stringify(querys.all) ? "btn-dark" : "btn-secondary")} name="all" onClick={handleQueryChange}>全部成員</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <MemberTable members={members} patchMember={patchMember}></MemberTable>
        </div>
      </div>
    </div>
  );
}

const MemberTable = props => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">暱稱</th>
          <th scope="col">加入日期</th>
          <th scope="col">退出日期</th>
          <th scope="col">踢除原因</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {(props.members && props.members.length > 0) ? (
          props.members.map((member, index) => <MemberTableItem key={member._id} member={member} patchMember={props.patchMember} index={index+1}></MemberTableItem>)
        ) : (
            <tr><td>查無成員</td></tr>
          )}
      </tbody>
    </table>
  );
}

const MemberTableItem = props => {
  const [isHovered, setIsHovered] = useState(false);
  const deleteButtonStyle = {
    opacity: isHovered ? 1 : 0,
    transition: "opacity .2s"
  };

  return (
    <tr onMouseOver={() => {setIsHovered(true)}} onMouseLeave={() => {setIsHovered(false)}} style={{height: "56px", backgroundColor: isHovered ? "#f2f2f2" : ""}}>
      <td className="fit">{props.index}</td>
      <td className="fit">{props.member.id}</td>
      <td>{props.member.name}</td>
      <td>{moment(props.member.join_date).format('YYYY/MM/DD')}</td>
      <td>{props.member.leave_date ? moment(props.member.leave_date).format('YYYY/MM/DD') : "-"}</td>
      <td>{props.member.kick_reason ? props.member.kick_reason : "-"}</td>
      <td className="fit">{
          !props.member.leave_date ?
          <button className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target={"#kickMemberModal" + props.member._id} style={deleteButtonStyle}>踢除</button>:
          ""
        }
      </td>
      <td><KickMemberModal patchMember={props.patchMember} member={props.member}></KickMemberModal></td>
    </tr>
  );
};

const AddMemberModal = (props) => {
  const [newMember, setNewMember] = useState({
    id: "",
    name: "",
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
      setNewMember({
        id: "",
        name: "",
        join_date: moment().format("YYYY/MM/DD")
      })
      evt.target.classList.remove('was-validated');
    }
    else
      evt.target.classList.add('was-validated');
  }

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

const KickMemberModal = (props) => {
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
      props.patchMember(props.member._id, kickData);
      window.$('#kickMemberModal' + props.member._id).modal('hide');
      setKickData({
        kick_reason: "",
        leave_date: moment().format('YYYY/MM/DD')
      })
      evt.target.classList.remove('was-validated');
    }
    else
      evt.target.classList.add('was-validated');
  }

  return (
    <div className="modal fade" id={"kickMemberModal" + props.member._id}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">踢除成員</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputKickReason">踢除原因</label>
                <input type="text" className="form-control" id="inputKickReason" name="kick_reason" onChange={handleChange} value={kickData.kick_reason}></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputKickDate">踢除日期</label>
                <input type="text" className="form-control" id="inputKickDate" name="leave_date" onChange={handleChange} value={kickData.leave_date} required pattern="([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))"></input>
                <div className="invalid-feedback">YYYY/MM/DD</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="submit" className="btn btn-danger">踢除</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default MemberManagement;