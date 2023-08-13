import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // You can now send the paymentMethod.id to your server for further processing
    }
  }

  const handleBackClick = () => {
      navigate('/cart');
  };

  return (
    <div className='flex flex-col items-center justify-start h-screen px-5 pt-20 space-y-6'>
      <div className='flex items-center justify-between w-full mb-5'>
        <Buttons context='back' className='mr-6' onClick={handleBackClick}/>
        <h1 className='text-black text-2xl'>Add Card</h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full'>
        <div className='flex flex-col items-center w-full space-y-5'>
          <label className='w-full flex flex-col items-center'>
            <span className='text-left w-80'>Card Details</span>
            <CardElement className='px-7 text-sm bg-tertiary text-black font-medium rounded-lg w-80 h-10' />
          </label>
        </div>
        <div className="flex justify-center w-full mt-2">
          <Buttons context="add_card" onClick={handleBackClick}></Buttons>
        </div>
      </form>
    </div>
  );
};

export default Payment;
