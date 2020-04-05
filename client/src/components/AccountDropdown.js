import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import SignOut from './SignOut';

const AccountDropdown = () => {
  const user = useSelector(state => state.auth.user);
  const dropdownMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    let $dropdown = window.$(dropdownRef.current);
    let $menu = window.$(dropdownMenuRef.current);
    positionMenu($menu);

    $dropdown.on('show.bs.dropdown', function() {
      $menu.stop(true, true).slideDown(100);
    });

    $dropdown.on('hide.bs.dropdown', function() {
      $menu.stop(true, true).slideUp(100);
    });
  }, []);
  
  const positionMenu = ($menu) => {
    let t = $menu.parent().offset().top + $menu.parent().outerHeight(true) + 4;
    let l = $menu.parent().outerHeight(true) - parseInt($menu.outerWidth(true));
    $menu.css('top', t);
    $menu.css('left', l);
  }

  return (
    <div className="dropdown d-inline-block" ref={dropdownRef}>
      <img className="dropdown-toggle" data-toggle="dropdown" src={user.pictureUrl} style={{verticalAlign: 'middle', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer'}} alt=''></img>
      <div className="dropdown-menu p-2 m-0" ref={dropdownMenuRef}>
        <div className="d-flex align-items-center text-nowrap">
          <img src={user.pictureUrl} style={{verticalAlign: 'middle', width: 40, height: 40, borderRadius: '50%'}} alt=''></img>
          <div className='text-left ml-2 align-text-top w-25'>
            <h5 className='mb-1'>{user.name}</h5>
            <small className='text-secondary'>{user.email}</small>
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <SignOut></SignOut>
      </div>
    </div>
  );
}
 
export default AccountDropdown;