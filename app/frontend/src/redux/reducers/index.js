import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';
import menuReducer from './menuReducer';
import categoryReducer from './categoryReducer';
import tableReducer from './tableReducer';

export default combineReducers({
  restaurant: restaurantReducer,
  menu: menuReducer,
  category: categoryReducer,
  table: tableReducer,
});
