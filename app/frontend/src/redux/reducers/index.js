import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurantReducer';
import { menuItemsReducer } from './menuItemsReducer';
import { categoryReducer } from './categoryReducer';
import { tableReducer } from './tableReducer';

export default combineReducers({
  restaurant: restaurantReducer,
  menuItems: menuItemsReducer,
  category: categoryReducer,
  table: tableReducer,
});
