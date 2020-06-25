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
    width: 'calc(100vw - ' + drawerWidth + 'px)'
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  noOutline: {
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    outline: 'none'
  },
  googleSignIn: {
    paddingTop: '4px',
    paddingRight: '11px',
    paddingBottom: '4px',
    paddingLeft: '4px',
    border: "0",
    fontFamily: "Roboto",
    backgroundColor: "#FFFFFF",
    transition: 'none',
    '&:hover': {
      backgroundColor: "#EEEEEE"
    }
  },
  backdrop: {
    zIndex: 9999,
    color: '#fff',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));