import React, { useState } from 'react';
import { Buttons } from '../../components';

const Payment = () => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const setInputState = {
    cardholderName: setCardholderName,
    cardNumber: setCardNumber,
    expirationDate: setExpirationDate,
    cvv: setCvv
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputState[name](value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({cardholderName, cardNumber, expirationDate, cvv});
  }

  return (
    //Title for the page
    <div className='flex flex-col items-center justify-start h-screen px-5 pt-20 space-y-6'>
      <div className='flex items-center justify-between w-full mb-5'>
        <Buttons context='back' className='mr-6' />
        <h1 className='text-black text-2xl'>Add Card</h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='flex flex-col items-center w-full space-y-5'>
          <label className='w-full flex flex-col items-center'>
            <span className='text-left w-80'>Cardholder Name</span>
            <input
              className='px-7 text-sm bg-tertiary text-black font-medium rounded-lg w-80 h-10'
              type='text'
              name='cardholderName'
              onChange={handleChange}
              placeholder=''
            />
          </label>
          <label className='w-full flex flex-col items-center'>
            <span className='text-left w-80'>Card Number</span>
            <input
              className='px-7 text-sm bg-tertiary text-black font-medium rounded-lg w-80 h-10'
              type='text'
              name='cardNumber'
              onChange={handleChange}
              placeholder=''
            />
          </label>
          <div className='flex space-x-1 justify-center w-full'>
            <label className='w-full flex flex-col items-center'>
              <span className='text-left w-36'>Expiration Date</span>
              <input
                className='px-7 text-sm bg-tertiary text-black font-medium rounded-lg w-36 h-10'
                type='text'
                name='expirationDate'
                onChange={handleChange}
                placeholder=''
              />
            </label>
            <label className='w-full flex flex-col items-center'>
              <span className='text-left w-36'>CVV</span>
              <input
                className='px-7 text-sm bg-tertiary text-black font-medium rounded-lg w-36 h-10'
                type='text'
                name='cvv'
                onChange={handleChange}
                placeholder=''
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center w-full mt-2">
          <Buttons context="add_card"></Buttons>
        </div>
      </form>
    </div>
  );
};

export default Payment;
