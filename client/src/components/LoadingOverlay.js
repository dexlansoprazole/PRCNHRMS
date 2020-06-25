import React from 'react';
import {Box, CircularProgress} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';

const LoadingOverlay = (props) => {
  const theme = useTheme();
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
    let $overlay = window.$(overlayRef.current);
    $overlay.css('opacity', props.loading ? 1 : 0);
    $overlay.css('pointer-events', props.loading ? 'auto' : 'none');
    let h = $overlay.parent().outerHeight();
    let w = $overlay.parent().outerWidth();
    $overlay.css('height', h);
    $overlay.css('width', props.global ? null : w);
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
    zIndex: props.global ? theme.zIndex.drawer - 1 : 1031,
    opacity: 0,
    background: theme.palette.common.white,
    borderRadius: props.round ? '4px' : '0px',
    margin: '0 0 0 0',
    boxSizing: 'border-box',
    color: theme.palette.primary.main,
    pointerEvents: 'none'
  }

  return (
    <div ref={overlayRef} style={overlayStyle} className={props.className}>
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