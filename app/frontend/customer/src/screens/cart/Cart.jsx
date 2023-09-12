import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons, Items, Popups } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, fetchCartItem, removeFromCart, updateCartItemNote, updatePickupType, completeCart } from '../../redux/actions/cartActions';
import { decodeToken } from '../../services/api';
import { chargeUser, fetchDefaultCard } from '../../redux/actions/paymentActions';
import { fetchOnGoingOrders } from '../../redux/actions/onGoingActions';


const SERVE_TO_TABLE_FEE = 5000;

const PickupType = {
  SELF_PICKUP: 'SELF_PICKUP',
  SERVE_TO_TABLE: 'SERVE_TO_TABLE',
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const cartId = useSelector(state => state.cart.cart?.id);
  const pickupType = useSelector(state => state.cart.cart?.pickup_type);
  const defaultCard = useSelector(state => state.payment.defaultCard);

  const paymentLoading = useSelector(state => state.payment.loading);
  const paymentError = useSelector(state => state.payment.error);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [checkoutCompleted, setCheckoutCompleted] = useState(null);

  useEffect(() => {
    const decodedToken = decodeToken();
    const userId = decodedToken?.sub;

    if (userId) {
      dispatch(fetchCartItem(parseInt(userId)));
      dispatch(fetchDefaultCard());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!paymentLoading && !paymentError && checkoutCompleted) {
        setPaymentSuccess(true);
        if (cartId) {
            console.log("Attempting to complete cart with cartId:", cartId);
            dispatch(completeCart(cartId)); // Mark the cart as completed
            dispatch(clearCart()); // Clear the cart

            const decodedToken = decodeToken();
            const userId = decodedToken?.sub;
            if (userId) {
              dispatch(fetchOnGoingOrders(parseInt(userId)));
            }
        } else {
            console.error("No cart ID found when trying to complete the cart.");
        }
    }
  }, [paymentLoading, paymentError, checkoutCompleted, cartId, dispatch]);

  const handleAddToCart = (item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.menuItem.id === item.id);
    if (existingCartItem) {
        dispatch(addToCart({ ...item, quantity: existingCartItem.quantity + 1 }));
    } else {
        dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };

  const handleRemoveFromCart = (cartItem) => {
    if (cartItem.quantity > 1) {
        const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
        handleAddToCart(updatedItem);
    } else {
        dispatch(removeFromCart(cartItem.id));
    }
  };

  const handleServeToTableClick = () => {
    if (cartId) {
      const newPickupType = (pickupType === PickupType.SERVE_TO_TABLE) ? PickupType.SELF_PICKUP : PickupType.SERVE_TO_TABLE;
      dispatch(updatePickupType(cartId, newPickupType));
    }
  };


  const handlePaymentClick = () => {
    if (!defaultCard) {
        navigate('/payment');
        return;
    }
    navigate('/payment-options');
  };

  const handleCheckout = () => {
    if (!defaultCard) {
        alert("Please select a default card for payment from the Payment Options.");
        navigate('/payment-options');
        return;
    }

    const amountInDongs = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) + (pickupType === PickupType.SERVE_TO_TABLE ? SERVE_TO_TABLE_FEE : 0);
    dispatch(chargeUser(amountInDongs));
    setCheckoutCompleted(true);
};

  const handleBackClick = () => {
    navigate('/menu-overview');
  };

  const isServeToTable = pickupType === PickupType.SERVE_TO_TABLE;

  const getTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) + (isServeToTable ? SERVE_TO_TABLE_FEE : 0);
    return total.toLocaleString('en-US') + ' đ';
  };

  const paymentOptionButtonText = defaultCard && defaultCard.card 
    ? `${defaultCard.card.brand} •••• •••• •••• ${defaultCard.card.last4}`
    : "Payment Options";

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

        <Buttons context='cardDetails' cardDetails={paymentOptionButtonText} onClick={handlePaymentClick} />


        {isServeToTable && (
          <p className="text-secondary flex justify-center text-sm mt-2">Serve to Table will cost an additional {SERVE_TO_TABLE_FEE.toLocaleString('en-US')} đ.</p>
        )}

        <div className='flex justify-between w-full items-center mb-2 mt-2'>
          <h2 className='text-3xl font-medium'>Total</h2>
          <h2 className='text-3xl font-medium'>{getTotalPrice()}</h2>
        </div>

        <Buttons context='checkout' onClick={handleCheckout} />
      </div>
      
      <Popups type="thank_you" visible={paymentSuccess} />
    </div>
  );

};

export default Cart;
