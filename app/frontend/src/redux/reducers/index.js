import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurantReducer';
import { menuItemsReducer } from './menuItemsReducer';
import { categoryReducer } from './categoryReducer';
import { tableReducer } from './tableReducer';
import { typeReducer } from './typeReducer';

export default combineReducers({
  restaurant: restaurantReducer,
  menuItems: menuItemsReducer,
  category: categoryReducer,
  table: tableReducer,
  type: typeReducer
});
