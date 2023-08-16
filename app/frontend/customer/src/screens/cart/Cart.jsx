import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons, Items, Popups } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, fetchCartItem, removeFromCart, updateCartItemNote, updatePickupType } from '../../redux/actions/cartActions';
import { decodeToken } from '../../services/api';

const SERVE_TO_TABLE_FEE = 5000;

const PickupType = {
  SELF_PICKUP : 'SELF_PICKUP',
  SERVE_TO_TABLE : 'SERVE_TO_TABLE',
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const menuItems = useSelector(state => state.menuItems.menuItems);
  const cartId = useSelector(state => state.cart.cart && state.cart.cart.id);
  const pickupType = useSelector(state => state.cart.cart && state.cart.cart.pickup_type);


  console.log("Cart Items:", cartItems);
  // console.log("Menu Items:", menuItems);

  useEffect(() => {
    // console.log("Fetching cart items...");
    const decodedToken = decodeToken();
    if (decodedToken && decodedToken.sub) {
      const userId = parseInt(decodedToken.sub);
      dispatch(fetchCartItem(userId));
    }
  }, [dispatch]);

  const handleAddToCart = (item) => {
    // console.log("Add to cart:", item);
    const existingCartItem = cartItems.find(cartItem => cartItem.menuItem.id === item.id);
    if (existingCartItem) {
        // Increase its quantity by 1
        dispatch(addToCart({ ...item, quantity: existingCartItem.quantity + 1 }));
    } else {
        dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };

  const handleRemoveFromCart = (cartItem) => {
    // console.log("Remove from cart:", cartId)
    if (cartItem.quantity > 1) {
        // Decrease the quantity and update the cart
        const updatedItem = {
            ...cartItem,
            quantity: cartItem.quantity - 1
        };
        handleAddToCart(updatedItem); // Use the same function to update the quantity
    } else {
        // If the quantity is 1, remove the item completely
        dispatch(removeFromCart(cartItem.id));
    }
  };

  const handleServeToTableClick = async () => {
    console.log("Serve to Table button clicked");
    console.log("Current cartId:", cartId);
    if (cartId) {
      console.log("Dispatching updatePickupType action");
      const newPickupType = (pickupType === PickupType.SERVE_TO_TABLE) ? PickupType.SELF_PICKUP : PickupType.SERVE_TO_TABLE;
      dispatch(updatePickupType(cartId, newPickupType));
      console.log("updatePickupType action dispatched");
    }
  };

  

  const [popupVisible, setPopupVisible] = useState(false);

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  const handleBackClick = () => {
    navigate('/menu-overview');
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
    if(popupVisible) {
      dispatch(clearCart());
    }
  }

  const isServeToTable = pickupType === PickupType.SERVE_TO_TABLE;

  const getTotalPrice = () => {
    let total = cartItems.reduce((acc, item) => {
        // Since the item's price already accounts for its quantity, just add it directly
        return acc + (item.price * item.quantity);
    }, 0);

    if (isServeToTable) {
        total += SERVE_TO_TABLE_FEE;
    }
    return total.toLocaleString('en-US') + ' đ';
  }

  return (
    <div className='flex flex-col h-screen px-5 pt-20'>
      <div className='flex items-center justify-between w-full mb-5'>
        <Buttons context='back' onClick={handleBackClick} />
        <h1 className='text-black text-2xl'>Cart</h1>
      </div>

      <div className="flex-grow overflow-y-auto space-y-2 scrollbar-hide"> 
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full space-y-3'>
          <p className='text-center'>Your cart is currently empty, please add more items to view your cart.</p>
        </div>
      ):(
        cartItems.map((cartItem) => {
          // Find the corresponding menu item based on the menuItemId
          const menuItem = cartItem.menuItem;
          //console.log("Cart Item:", cartItem);
          //console.log("Matched Menu Item:", menuItem);
          if (!menuItem) return null;

          return (
            <Items
              key={cartItem.id}
              type='food_item_cart'
              cartItemId={cartItem.id}
              onAdd={() => handleAddToCart(menuItem)}
              onRemove={() => handleRemoveFromCart(cartItem.id)}
              onUpdateNotes={(updatedNotes) => {
                  dispatch(updateCartItemNote(cartItem.id, updatedNotes));
              }}
              {...menuItem}
              quantity={cartItem.quantity}
            />
          );
          })
      )}

      </div>

      <div className="flex flex-col justify-end w-full bg-white pb-3 pt-2">
        <div className='flex justify-between w-full space-x-2 mb-3'>
          <div className='w-1/2 pl-1'>
          <Buttons
            context='self_pickup'
            onClick={() => {
              if (cartId) {
                dispatch(updatePickupType(cartId, PickupType.SELF_PICKUP));
              }
            }}
            isServeToTable={isServeToTable}
          />
          </div>
          <div className='w-1/2 pr-1'>
            <Buttons
              context='serve_to_table'
              onClick={handleServeToTableClick}
              isServeToTable={isServeToTable}
            />
          </div>
        </div>

        <Buttons context='payment' onClick={handlePaymentClick} />

        {isServeToTable && (
          <p className="text-red-500 text-xs ml-3 mt-1">* An extra fee of {SERVE_TO_TABLE_FEE.toLocaleString('en-US')}đ will be added for 'Serve to Table'.</p>
        )}

        <div className='flex justify-between w-full items-center mb-2 mt-2'>
          <h2 className='text-3xl font-medium'>Total</h2>
          <h2 className='text-3xl font-medium'>{getTotalPrice()}</h2>
        </div>

        <Buttons context='checkout' onClick={togglePopup} />
      </div>
      
      <Popups type="thank_you" visible={popupVisible} />
    </div>
  );

};

export default Cart;
