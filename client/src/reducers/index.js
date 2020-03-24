import {combineReducers} from 'redux';
import member from './member';
import auth from './auth';
import team from './team';
import loading from './loading';

const rootReducer = combineReducers({
  loading,
  member,
  auth,
  team
});

export default rootReducer;