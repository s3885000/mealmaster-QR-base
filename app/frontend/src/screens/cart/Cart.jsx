import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons, Items, Popups } from '../../components';

const Cart = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(false);

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  const handleBackClick = () => {
    navigate('/menu-overview');
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
    if(popupVisible) {
      setCartEmpty(true);
    }
  }

  return (
    <div className='flex flex-col items-center justify-start min-h-screen px-5 pt-20 space-y-3 overflow-y-auto'>
      <div className='flex items-center justify-between w-full mb-5'>
        <Buttons context='back' onClick={handleBackClick}/>
        <h1 className='text-black text-2xl'>Cart</h1>
      </div>

      {cartEmpty ? (
        <div className='flex flex-col items-center justify-center h-full space-y-3'>
          <p className='text-center'>Your cart is currently empty, please add more item to view your cart.</p>
        </div>
      ) : (
        <>
          <div className='flex flex-col space-y-2'>
            <Items type='food_item_cart' />
            <Items type='food_item_cart' />
            <Items type='food_item_cart' />
          </div>

          <hr className='border-placeholders w-4/5 my-3' />

          <div className='flex justify-between w-full space-x-2 mb-3'>
            <div className='w-1/2 pl-1'>
              <Buttons context='self_pickup'/>
            </div>
            <div className='w-1/2 pr-1'>
              <Buttons context='serve_to_table'/>
            </div>
          </div>

          <Buttons context='payment' onClick={handlePaymentClick}/>

          <div className='flex justify-between w-full items-center mb-3'>
            <h2 className='text-3xl font-medium'>Total</h2>
            <h2 className='text-3xl font-medium'>81.000 đ</h2>
          </div>

          <Buttons context='checkout' onClick={togglePopup}/>
        </>
      )}

      <Popups type="thank_you" visible={popupVisible} />
    </div>
  );
};

export default Cart;
