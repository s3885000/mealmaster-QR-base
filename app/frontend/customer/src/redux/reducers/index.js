import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurantReducer';
import { menuItemsReducer } from './menuItemsReducer';
import { typeReducer } from './typeReducer';
import { menuItemDetailsReducer } from './menuItemDetailsReducer';
import { authReducer } from './authentication/authReducer';
import  cartReducer  from './cartReducer';
import userReducer from './userReducer';
import paymentReducer from './paymentReducer';
import onGoingReducer from './onGoingReducer';
import orderReducer from './orderReducer';


export default combineReducers({
  restaurant: restaurantReducer,
  menuItems: menuItemsReducer,
  menuItemDetails: menuItemDetailsReducer,
  auth: authReducer,
  cart: cartReducer,
  type: typeReducer,
  user: userReducer,
  payment: paymentReducer,
  onGoing: onGoingReducer,
  order: orderReducer,
});
