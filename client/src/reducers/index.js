import {combineReducers} from 'redux';
import auth from './auth';
import user from './user';
import team from './team';
import teams from './teams';
import loading from './loading';
import initialized from './initialized';
import notification from './notification';
import teamSelected from './teamSelected';
import isDarkMode from './isDarkMode'

const rootReducer = combineReducers({
  initialized,
  loading,
  notification,
  auth,
  user,
  team,
  teams,
  teamSelected,
  isDarkMode
});

export default rootReducer;