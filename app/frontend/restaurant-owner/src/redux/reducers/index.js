import { combineReducers } from 'redux';
import auth from './authentication/authReducer';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
