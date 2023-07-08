import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons, Items, Popups } from '../../components';

const Cart = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  const handleBackClick = () => {
    navigate('/menu-overview');
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  }

  return (
    <div className='flex flex-col items-center justify-start min-h-screen px-5 pt-20 space-y-6 overflow-y-auto'>
      <div className='flex items-center justify-between w-full mb-5'>
        <Buttons context='back' className='mr-6' onClick={handleBackClick}/>
        <h1 className='text-black text-2xl'>Cart</h1>
      </div>

      <div className='flex flex-col space-y-5'>
        <Items type='food_item_cart' />
        <Items type='food_item_cart' />
        <Items type='food_item_cart' />
      </div>

      <hr className='border-placeholders w-4/5 my-5' />

      <div className='flex justify-between w-full space-x-4 mb-7'>
        <div className='w-1/2 pl-2.5'>
          <Buttons context='self_pickup' className='flex w-full'/>
        </div>
        <div className='w-1/2 pr-2.5'>
          <Buttons context='serve_to_table' className='flex w-full'/>
        </div>
      </div>

      <div className='w-full mb-7'>
        <Buttons context='payment' onClick={handlePaymentClick}/>
      </div>

      <div className='flex justify-between w-full items-center mb-7'>
        <h2 className='text-3xl font-medium'>Total</h2>
        <h2 className='text-3xl font-medium'>81.000 đ</h2>
      </div>

      <div className='w-full'>
        <Buttons context='checkout' onClick={togglePopup}/>
      </div>

      <Popups type="thank_you" visible={popupVisible} />
    </div>
  );
};

export default Cart;
