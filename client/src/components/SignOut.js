import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import authActions from '../actions/auth';

const SignOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const signOut = () => dispatch(authActions.signOut());

  return (
    <div className="nav-item d-flex justify-content-end">
      <div className=" d-flex" style={{width: "80px", height: "40px", padding: "4px"}}>
        <button className="btn btn-sm btn btn-light text-center align-text-top w-100 h-100 d-inline border" onClick={signOut}>登出</button>
      </div>
    </div>
  );
}

export default SignOut;
