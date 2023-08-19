import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { OnGoing, Cart, Home, Login, LoginPassword, MenuDetail, MenuOverview, Payment, Profile, ScanQR, SignUp, NearbyRestaurant, PaymentOptions } from './screens';
import { Boxes, Navigation, Popups, Loading } from './components';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useAuthRedirect } from './hooks/useAuthRedirect';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useAuthRedirect(location.pathname);

  const shouldShowNavBar = !['/menu-detail', '/cart', '/on-going', '/payment', '/nearby-restaurants', '/login', '/payment-options'].some((path) => location.pathname.startsWith(path));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={shouldShowNavBar ? "pb-16" : ""}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-password" element={<LoginPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/scanqr" element={<ScanQR />} />
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/on-going" element={<OnGoing />} />
          <Route path="/menu-detail/:itemId" element={<MenuDetail />} />
          <Route path="/menu-overview/:restaurantId/table/:tableNo" element={<MenuOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/nearby-restaurants" element={<NearbyRestaurant />} /> 
          <Route path="/popups" element={<Popups />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment-options" element={<PaymentOptions />} /> 
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
