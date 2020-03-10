import {combineReducers} from 'redux';
import memberManagement from './memberManagement';
import user from './user';

const rootReducer = combineReducers({
  memberManagement,
  user
});

export default rootReducer;