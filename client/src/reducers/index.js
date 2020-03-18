import {combineReducers} from 'redux';
import member from './member';
import user from './user';
import team from './team';
import signIn from './signIn';
import loading from './loading';

const rootReducer = combineReducers({
  loading,
  signIn,
  member,
  user,
  team
});

export default rootReducer;