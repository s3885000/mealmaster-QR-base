import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../redux/actions/paymentActions';
import { ShieldIcon, LockOffIcon, StripeLogoIcon } from '../../asset/icons/box';
import './payment.css';

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,  // This hides the postal code, which you may not need
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.payment);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
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
      if (!error && paymentMethod) {
        // Dispatch the action to add the card
        dispatch(addCard(paymentMethod.id));
      }

    }
  }

  const handleBackClick = () => {
      navigate('/cart');
  };

  return (
    <div className='flex flex-col items-center justify-between h-screen px-5 pt-20'>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className='flex items-center justify-between w-full mb-5'>
        <Buttons context='back' className='mr-6' onClick={handleBackClick}/>
        <h1 className='text-black text-2xl'>Add Card</h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full flex flex-col flex-grow'>
        <div className='flex flex-col items-center w-full space-y-5 mb-auto'>
          <label className='w-full mt-2'>
            <div className='flex items-center'>
              <span className='text-left mb-2 block'>Card Details</span>
              <ShieldIcon className="ml-2 mb-2" />
            </div>
            <div className="flex items-center justify-center h-14 bg-tertiary rounded-lg px-4">
              <CardElement 
                  options={CARD_ELEMENT_OPTIONS} 
                  className='flex-grow text-sm text-black font-medium w-full' 
              />
            </div>
            <div className="flex items-center mt-5">
              <LockOffIcon className="mr-0.5 mb-1" />
              <span className='text-xs'>Your card details will be saved securely.</span>
            </div>
            <div className="flex items-center mt-8">
              <span className='text-xs first-word-spacing text-left'>Securely add your credit card details to enable transaction processing. Your information is encrypted for protection. Read our Credit Card Agreement and agree to our 
              <a href="/path-to-your-terms-and-conditions" className="text-blue-600 hover:underline"> Terms and Conditions</a> before proceeding.</span>
            </div>
          </label>
          
        </div>
        <div className="flex flex-col justify-end w-full bg-white pb-4">
          <div className="flex items-center justify-center mb-3">
            <span className="text-xs italic">Powered by</span>
            <StripeLogoIcon className="ml-2" />
          </div>
          <Buttons context="add_card" onClick={(e) => handleSubmit(e)}></Buttons>
        </div>
      </form>
    </div>
  );
};

export default Payment;
