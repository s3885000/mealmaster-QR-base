import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { OnGoing, Cart, Home, Login, LoginPassword, MenuDetail, MenuOverview, Payment, Profile, ScanQR, SignUp, NearbyRestaurant } from './screens';
import { Boxes, Navigation, Popups } from './components'
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import { useAuthRedirect } from './hooks/useAuthRedirect';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51NeUwHG8F2Gq2NFCGiVzCgCjO6HGSidP13Ej5G4PszuEM4HRC4ZR8k7culS9UNotBLyPpr7wNcFNzx4JlA5y3S3j00V58hXZLd");

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const PaymentSuccess = () => {
    useEffect(() => {
      navigate('/cart');
    }, [navigate]);

    return null;  
  };

  useAuthRedirect(location.pathname);

  const shouldShowNavBar = !['/menu-detail', '/cart', '/on-going', '/payment', '/nearby-restaurants', '/login'].some((path) => location.pathname.startsWith(path));

  return (
    <>
      <div className={shouldShowNavBar ? "pb-16" : ""}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-password" element={<LoginPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/scanqr" element={<ScanQR />} />
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/on-going" element={<OnGoing />} />
          <Route path="/menu-detail/:itemId" element={<MenuDetail />} />
          <Route path="/menu-overview/:restaurantId/table/:tableNo" element={<MenuOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/nearby-restaurants" element={<NearbyRestaurant />} /> 
          <Route path="/popups" element={<Popups />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {shouldShowNavBar && <Navigation />}
    </>
  );
};

const LocationProvider = () => {
  const location = useLocation();
  return <App location={location} />;
}

const AppWrapper = () => {
  return (
    <Router>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <LocationProvider />
        </Elements>
      </Provider>
    </Router>
  );
};

export default AppWrapper;
