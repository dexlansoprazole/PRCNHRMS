import {combineReducers} from 'redux';
import member from './member';
import user from './user';
import team from './team';
import signIn from './signIn';

const rootReducer = combineReducers({
  signIn,
  member,
  user,
  team
});

export default rootReducer;