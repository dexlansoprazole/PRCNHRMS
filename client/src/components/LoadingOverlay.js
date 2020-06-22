import React from 'react';
import {Box, CircularProgress} from '@material-ui/core';

const LoadingOverlay = (props) => {
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
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
    background: 'rgba(39, 42, 43, 0.6)',
    transition: 'opacity 200ms ease-in-out',
    borderRadius: props.round ? '4px' : '0px',
    margin: '0 0 0 0',
    boxSizing: 'border-box',
    color: '#fff',
    pointerEvents: 'none'
  }

  return (
    <div ref={overlayRef} style={overlayStyle}>
      <Box>
        <Box display='flex' justifyContent="center" alignItems="center">
          <CircularProgress color="inherit" />
        </Box>
        {props.global ? <Box mt={1} fontSize={24} fontWeight="fontWeightBold">Loading...</Box> : null}
      </Box>
    </div>
  );
}

export default LoadingOverlay;