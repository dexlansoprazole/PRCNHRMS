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
    zIndex: 9999,
    opacity: 0,
    background: 'rgba(39, 42, 43, 0.5)',
    transition: 'opacity 200ms ease-in-out',
    borderRadius: '4px',
    margin: '0 0 0 0',
    boxSizing: 'border-box'
  }

  return (
    <div className='text-light' ref={overlayRef} style={overlayStyle}>
      <div className='text-center'>
        <div className="spinner-border text-light" role="status"></div>
        <h3>Loading... </h3>
      </div>
    </div>
  );
}

export default LoadingOverlay;