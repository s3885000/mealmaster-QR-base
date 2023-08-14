import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToStripe = async () => {
      const query = new URLSearchParams(window.location.search);
      if (query.get("success")) {
        navigate('/cart');
      } else if (query.get("canceled")) {
        navigate('/payment');
      }
    };

    redirectToStripe();
  }, [navigate]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/payment', { method: 'POST' });
      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>Pay with Stripe</button>
    </div>
  );
};

export default Payment;
