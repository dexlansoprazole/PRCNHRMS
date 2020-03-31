import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Transition, TransitionGroup} from 'react-transition-group';
import notificationActions from '../actions/notification';
import Toast from './Toast'

const Toasts = () => {
  const dispatch = useDispatch();
  const removeToast = (index) => dispatch(notificationActions.removeToast(index));
  const toasts = useSelector(state => state.notification.toasts);
  const toastsRef = useRef(null);

  const positionToast = ($toasts) => {
    let t = $toasts.parent().offset().top;
    let r = (window.$(window).width() - ($toasts.parent().offset().left + $toasts.parent().outerWidth() - parseInt($toasts.parent().css('padding-right'), 10)));
    $toasts.css('top', t);
    $toasts.css('right', r);
  }

  const renderToasts = (toasts) => {
    let res = []
    toasts.forEach((toast) => {
      res.push(
        <Transition
          timeout={200}
          key={toast.index}
          onEnter={el => {
            let $toast = window.$(el);
            $toast.toast({animation: false, autohide: false});
            $toast.toast('show');
            $toast.css('display', 'none');
            $toast.stop(true, true).slideDown(200);
          }}
          onEntered={() => {
            if (toast.type !== 'danger')
              setTimeout(removeToast, 3000, toast.index);
          }}
          onExit={el => {
            let $toast = window.$(el);
            $toast.stop(true, true).slideUp(200);
          }}
          in={true}
          appear
          unmountOnExit
        >
          <Toast type={toast.type} title={toast.title} msg={toast.msg} remove={() => removeToast(toast.index)}></Toast>
        </Transition>
      )
    });

    return res;
  }

  useEffect(() => {
    let $toasts = window.$(toastsRef.current);
    positionToast($toasts);
    window.$(window).resize(() => positionToast($toasts));
  }, []);

  return (
    <div ref={toastsRef} style={{position: 'absolute', zIndex: 1000}}>
      <TransitionGroup>
        {renderToasts(toasts)}
      </TransitionGroup>
    </div>
  );
}

export default Toasts;