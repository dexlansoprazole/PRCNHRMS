import React from 'react';
import clsx from 'clsx';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useTheme} from '@material-ui/core/styles'
import {Drawer as MuiDrawer, List, ListItem, ListItemText, Collapse, Backdrop} from '@material-ui/core';
import {ChevronDown, ChevronUp} from 'react-feather';
import {useWindowResize} from './useWindowResize';
import useStyles from '../styles';
import {routeNameMap} from '../constants'

const Drawer = (props) => {
  const open = props.open;
  const handleClose = props.onClose;
  const {width} = useWindowResize();
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation();
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const teamSelected = useSelector(state => state.teamSelected);
  const [teamCollapseOpen, setTeamCollapseOpen] = React.useState(true);
  const [clanBattleCollapseOpen, setClanBattleCollapseOpen] = React.useState(true);

  const handleTeamCollapseClick = () => {
    setTeamCollapseOpen(!teamCollapseOpen);
  };

  const handleClanBattleCollapseClick = () => {
    setClanBattleCollapseOpen(!clanBattleCollapseOpen);
  };

  const handleItemClick = (index) => {
    if (width < theme.breakpoints.values.md)
      handleClose();
  }

  const ListItemLink = (props) => {
    const {to, ...other} = props;
    const primary = routeNameMap[to];

    return (
      <ListItem
        button
        component={Link}
        to={to}
        onClick={handleItemClick}
        selected={location.pathname === to}
        {...other}
      >
        <ListItemText primary={primary} />
      </ListItem>
    );
  }

  return (
    <>
      <MuiDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List>
          <ListItemLink
            to='/home'
            classes={{
              selected: classes.drawerListItemSelected
            }}
          />
          {isSignedIn && teamSelected ?
            <>
              <ListItem button onClick={handleTeamCollapseClick}>
                <ListItemText primary="戰隊管理" />
                {teamCollapseOpen ? <ChevronUp /> : <ChevronDown />}
              </ListItem>
              <Collapse in={teamCollapseOpen} timeout="auto" unmountOnExit>
                <ListItemLink
                  to={'/team/member'}
                  classes={{
                    root: classes.nested,
                    selected: classes.drawerListItemSelected
                  }}
                />
                <ListItemLink
                  to={'/team/permission'}
                  classes={{
                    root: classes.nested,
                    selected: classes.drawerListItemSelected
                  }}
                />
              </Collapse>
              <ListItem button onClick={handleClanBattleCollapseClick}>
                <ListItemText primary="戰隊競賽" />
                {clanBattleCollapseOpen ? <ChevronUp /> : <ChevronDown />}
              </ListItem>
              <Collapse in={clanBattleCollapseOpen} timeout="auto" unmountOnExit>
                <ListItemLink
                  to='/clan_battle/attendance'
                  classes={{
                    root: classes.nested,
                    selected: classes.drawerListItemSelected
                  }}
                />
              </Collapse>
            </>
            : null}
        </List>
      </MuiDrawer>
      {
        width < theme.breakpoints.values.md ?
          <Backdrop
            open={open}
            onClick={handleClose}
            classes={{
              root: classes.drawerBackdrop
            }}
          />
          : null
      }
    </>
  );
}

export default Drawer;
