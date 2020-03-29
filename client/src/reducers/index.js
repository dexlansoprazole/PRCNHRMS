import {combineReducers} from 'redux';
import member from './member';
import auth from './auth';
import team from './team';
import loading from './loading';
import initialized from './initialized'
import notification from './notification'

const rootReducer = combineReducers({
  initialized,
  loading,
  notification,
  member,
  auth,
  team
});

export default rootReducer;