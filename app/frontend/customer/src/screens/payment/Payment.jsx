import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY); // Ensure this is the correct key

const Payment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToStripe = async () => {
      const query = new URLSearchParams(window.location.search);
      if (query.get("success")) {
        navigate('/cart');
      } else if (query.get("canceled")) {
        navigate('/payment');
      } else {
        try {
          const response = await fetch('http://localhost:4000/payment', { method: 'POST' });
          if (!response.ok) {
            throw new Error('Failed to create Stripe checkout session');
          }
          const session = await response.json();
          const stripe = await stripePromise;
          const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
  
          if (error) {
            console.log(error);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    redirectToStripe();
  }, [navigate]);

  return null;
};

export default Payment;
