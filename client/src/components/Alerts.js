import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Transition, TransitionGroup} from 'react-transition-group';
import notificationActions from '../actions/notification';
import {Alert} from 'react-bootstrap'

const Alerts = () => {
  const dispatch = useDispatch();
  const removeAlert = (index) => dispatch(notificationActions.removeAlert(index));
  const alerts = useSelector(state => state.notification.alerts);
  const alertsRef = useRef(null);

  const positionAlerts = ($alerts) => {
    let t = $alerts.parent().offset().top;
    let l = $alerts.parent().offset().left + parseInt($alerts.parent().css('padding-left'));
    let w = $alerts.parent().width();
    $alerts.css('top', t);
    $alerts.css('left', l);
    $alerts.css('width', w);
  }

  const renderAlerts = (alerts) => {
    alerts = alerts.map(alert =>
      <Transition
        timeout={200}
        key={alert.index}
        onEnter={el => {
          let $alert = window.$(el);
          $alert.css('display', 'none');
          $alert.stop(true, true).slideDown(200);
        }}
        onEntered={() => {
          if (alert.type !== 'danger')
            setTimeout(removeAlert, 800, alert.index);
        }}
        onExit={el => {
          let $alert = window.$(el);
          $alert.stop(true, true).slideUp(200);
        }}
        in={true}
        appear
        unmountOnExit
      >
        <Alert variant={alert.type} onClose={() => removeAlert(alert.index)} onClick={() => removeAlert(alert.index)} style={{cursor: 'pointer'}} dismissible>
          {alert.msg}
        </Alert>
      </Transition>
    )
    return alerts;
  }

  useEffect(() => {
    let $alerts = window.$(alertsRef.current);
    positionAlerts($alerts);
    window.$(window).resize(() => positionAlerts($alerts));
  }, []);

  return (
    <div ref={alertsRef} style={{position: 'absolute', zIndex: 1000, paddingTop: '16px', background: 'inherit'}}>
      <TransitionGroup>
        {renderAlerts(alerts)}
      </TransitionGroup>
    </div>
  );
}

export default Alerts;