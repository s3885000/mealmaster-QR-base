import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51NeUwHG8F2Gq2NFCGiVzCgCjO6HGSidP13Ej5G4PszuEM4HRC4ZR8k7culS9UNotBLyPpr7wNcFNzx4JlA5y3S3j00V58hXZLd");

const Payment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToStripe = async () => {
      try {
        const response = await fetch('http://localhost:3000/create-checkout-session', { method: 'POST' });
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

    redirectToStripe();
  }, []);

  return null;
};

export default Payment;
