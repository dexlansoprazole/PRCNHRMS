import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import team from './team';
import teams from './teams';
import loading from './loading';
import initialized from './initialized'
import notification from './notification'

const rootReducer = combineReducers({
  initialized,
  loading,
  notification,
  auth,
  user,
  team,
  teams
});

export default rootReducer;