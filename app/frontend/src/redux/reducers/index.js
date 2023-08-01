import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurantReducer';
import { menuItemsReducer } from './menuItemsReducer';
import { typeReducer } from './typeReducer';

export default combineReducers({
  restaurant: restaurantReducer,
  menuItems: menuItemsReducer,
  type: typeReducer
});
