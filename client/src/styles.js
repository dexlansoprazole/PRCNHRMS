import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 200;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  loadingOverlayDrawerClose: {
    transition: theme.transitions.create(['width', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: '100vw'
  },
  loadingOverlayDrawerOpen: {
    transition: theme.transitions.create(['width', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: 'calc(100vw - ' + drawerWidth + 'px)',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  appBar: {
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    backgroundColor: theme.palette.primary,
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
    },
    zIndex: theme.zIndex.drawer,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  },
  drawerPaper: {
    top: 64,
  },
  drawerBackdrop: {
    zIndex: theme.zIndex.drawer - 1,
    top: '64px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  contentDrawerOpen: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'fixed',
    top: 64,
    width: 'calc(100% - ' + drawerWidth + 'px - ' + theme.spacing(3) * 2 + 'px)',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - ' + theme.spacing(3) * 2 + 'px)',
    },
  },
  contentDrawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    position: 'fixed',
    top: 64,
    width: 'calc(100% - ' + theme.spacing(3)*2  + 'px)',
    padding: theme.spacing(3),
  },
  noOutline: {
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    outline: 'none'
  },
  googleSignIn: {
    paddingTop: '4px !important',
    paddingRight: '11px !important',
    paddingBottom: '4px !important',
    paddingLeft: '4px !important',
    border: "0 !important",
    fontFamily: "Roboto !important",
    backgroundColor: "#FFFFFF !important",
    transition: 'none !important',
    '&:hover': {
      backgroundColor: "#EEEEEE !important"
    }
  },
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawerListItemSelected: {
    backgroundColor: theme.palette.primary.lighter + ' !important',
    color: theme.palette.primary.dark + ' !important',
  }
}));