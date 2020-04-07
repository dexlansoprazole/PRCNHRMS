import React, {useEffect, useRef} from 'react';

const LoadingOverlay = (props) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    let $overlay = window.$(overlayRef.current);
    $overlay.css('opacity', props.loading ? 1 : 0);
    $overlay.css('pointer-events', props.loading ? 'auto' : 'none');
    let h = $overlay.parent().outerHeight();
    let w = $overlay.parent().outerWidth();
    $overlay.css('height', props.global ? '100%' : h);
    $overlay.css('width', props.global ? '100%' : w);
    if (props.global) {
      $overlay.css('margin-top', '-' + $overlay.parent().css('padding-top'));
      $overlay.css('margin-left', '-' + $overlay.parent().css('padding-left'));
    }
  }, [props]);

  const overlayStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: props.global ? 9999 : 1031,
    opacity: 0,
    background: props.global ? 'rgba(39, 42, 43, 0.5)' : 'rgba(255, 255, 255, 0.8)',
    transition: 'opacity 200ms ease-in-out',
    borderRadius: '4px',
    margin: '0 0 0 0',
    boxSizing: 'border-box'
  }

  return (
    <div className='text-light' ref={overlayRef} style={overlayStyle}>
      <div className='text-center'>
        <div className={"spinner-border text-" + (props.global ? 'light' : 'primary')} role="status"></div>
        {props.global ? <h3>Loading... </h3> : null}
      </div>
    </div>
  );
}

export default LoadingOverlay;