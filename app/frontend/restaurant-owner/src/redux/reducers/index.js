import { combineReducers } from 'redux';
import auth from './authentication/authReducer';
import onGoingReducer from './onGoingReducer';
import updateStatusReducer from './updateStatusReducer';

const rootReducer = combineReducers({
  auth,
  onGoing: onGoingReducer,
  updateStatus: updateStatusReducer,
});

export default rootReducer;
