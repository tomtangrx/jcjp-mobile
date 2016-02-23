import {combineReducers} from 'redux';
import auth from '../reducers/auth';
import lessons from '../reducers/lessons';
import quiz from '../reducers/quiz';
import user from '../reducers/user';

const rootReducer = combineReducers({
  auth,
  lessons,
  quiz,
  user
});

export default rootReducer;
