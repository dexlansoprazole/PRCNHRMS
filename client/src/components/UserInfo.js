import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Grid, IconButton} from '@material-ui/core';
import {Edit, Close, Check} from '@material-ui/icons';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import userActions from '../actions/user';
import LoadingOverlay from './LoadingOverlay';

const UserInfo = props => {
  const {user, isEditing, setIsEditing} = props;
  const [nameFieldValue, setNameFieldValue] = React.useState(user.name);
  const loading = useSelector(state => state.loading['PATCH_USER']);
  const dispatch = useDispatch();
  const patchUser = async (data) => dispatch(userActions.patchUser(data));

  const handleSubmit = async () => {
    if (nameFieldValue) {
      await patchUser({name: nameFieldValue});
      setIsEditing(false);
    }
  }

  const renderUserName = () => {
    if (isEditing) {
      return (
        <ValidatorForm onSubmit={handleSubmit}>
          <LoadingOverlay loading={loading} size={16} />
          <TextValidator
            autoFocus
            size='small'
            value={nameFieldValue}
            onChange={e => setNameFieldValue(e.target.value)}
            onKeyDown={e => e.stopPropagation()}
            validators={['required', 'matchRegexp:^.{1,30}$']}
            errorMessages={['必填', '長度必須在1到30之間']}
            style={{width: 168}}
            disabled={loading}
          />
          <IconButton
            type='submit'
            style={{padding: 4, marginLeft: 4}}
          >
            <Check style={{fontSize: 16}} />
          </IconButton>
          <IconButton
            style={{padding: 4, marginLeft: 4}}
            onClick={() => {
              setIsEditing(false);
              setNameFieldValue(user.name);
            }}
          >
            <Close style={{fontSize: 16}} />
          </IconButton>
        </ValidatorForm>
      );
    }
    else {
      return (
        <>
          {user.name}
          <IconButton
            style={{padding: 4, marginLeft: 4}}
            onClick={() => setIsEditing(true)}
          >
            <Edit style={{fontSize: 16}} />
          </IconButton>
        </>
      );
    }
  }

  return (
    <>
      <Grid item>
        <img src={user.pictureUrl} style={{verticalAlign: 'middle', width: 40, height: 40, borderRadius: '50%'}} alt='' />
      </Grid>
      <Grid item>
        <Box fontSize={16} fontWeight="fontWeightBold" style={{whiteSpace: 'nowrap'}}>
          {renderUserName()}
        </Box>
        <Box fontSize={10} color='text.secondary' style={{whiteSpace: 'nowrap'}}>{user.email}</Box>
      </Grid>
    </>
  )
}

export default UserInfo
