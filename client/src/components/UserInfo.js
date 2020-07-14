import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Grid, IconButton, TextField } from '@material-ui/core';
import { Edit, Close, Check } from '@material-ui/icons';
import userActions from '../actions/user';

const UserInfo = props => {
  const { user, isEditing, setIsEditing } = props;
  const [nameFieldValue, setNameFieldValue] = React.useState(user.name);
  const dispatch = useDispatch();
  const patchUser = async (data) => dispatch(userActions.patchUser(data));

  const renderUserName = () => {
    if (isEditing) {
      return (
        <>
          <TextField
            autoFocus
            size='small'
            value={nameFieldValue}
            onChange={e => setNameFieldValue(e.target.value)}
            style={{ width: 168 }}
          />
          <IconButton
            style={{ padding: 4, marginLeft: 4 }}
            onClick={async () => {
              await patchUser({ name: nameFieldValue });
              setIsEditing(false);
            }}
          >
            <Check style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            style={{ padding: 4, marginLeft: 4 }}
            onClick={() => {
              setIsEditing(false);
              setNameFieldValue(user.name);
            }}
          >
            <Close style={{ fontSize: 16 }} />
          </IconButton>
        </>
      );
    }
    else {
      return (
        <>
          {user.name}
          <IconButton
            style={{ padding: 4, marginLeft: 4 }}
            onClick={() => setIsEditing(true)}
          >
            <Edit style={{ fontSize: 16 }} />
          </IconButton>
        </>
      );
    }
  }

  return (
    <>
      <Grid item>
        <img src={user.pictureUrl} style={{ verticalAlign: 'middle', width: 40, height: 40, borderRadius: '50%' }} alt='' />
      </Grid>
      <Grid item>
        <Box fontSize={16} fontWeight="fontWeightBold" style={{ whiteSpace: 'nowrap' }}>
          {renderUserName()}
        </Box>
        <Box fontSize={10} color='text.secondary' style={{ whiteSpace: 'nowrap' }}>{user.email}</Box>
      </Grid>
    </>
  )
}

export default UserInfo
