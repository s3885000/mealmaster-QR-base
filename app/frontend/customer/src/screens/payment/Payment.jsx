import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToStripe = async () => {
      try {
        // Fetch the session ID from the backend
        const response = await fetch('http://localhost:4000/payment', { method: 'POST' });
        if (!response.ok) {
          throw new Error("Failed to fetch session ID from backend.");
        }
        const { id: sessionId } = await response.json();

        // Redirect to the Stripe Checkout page
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    redirectToStripe();
  }, []);

  return (
    <div>
      {/* A loading state or spinner can be shown here while the redirection is in progress */}
      Redirecting to Stripe Checkout...
    </div>
  );
};

export default Payment;
