import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurantReducer';
import { menuItemsReducer } from './menuItemsReducer';
import { typeReducer } from './typeReducer';
import { menuItemDetailsReducer } from './menuItemDetailsReducer';


export default combineReducers({
  restaurant: restaurantReducer,
  menuItems: menuItemsReducer,
  menuItemDetails: menuItemDetailsReducer,
  type: typeReducer
});
