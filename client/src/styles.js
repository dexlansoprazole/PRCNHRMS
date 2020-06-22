import {makeStyles, useTheme} from '@material-ui/core/styles';

const drawerWidth = 200;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    backgroundColor: '#f381a7',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
  btnTableItemFunc: {
    transition: "opacity .2s",
    backgroundColor: "transparent",
    border: '1px solid transparent',
    borderRadius: 4,
    padding: "4px",
    margin: "0px 8px 0px 8px",
    '&:focus': {
      outline: 'none',
      boxShadow: 'none'
    },
    '&:hover': {
      backgroundColor: '#ddd'
    }
  }
}));