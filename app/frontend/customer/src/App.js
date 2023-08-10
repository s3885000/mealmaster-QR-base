import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { OnGoing, Cart, Home, Login, LoginPassword, MenuDetail, MenuOverview, Payment, Profile, ScanQR, SignUp, NearbyRestaurant } from './screens';
import { Boxes, Navigation, Popups} from './components'
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'

const App = () => {
  const location = useLocation();

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
          <Route path="/scanqr" element={<ScanQR />} />
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/on-going" element={<OnGoing />} />
          <Route path="/menu-detail/:itemId" element={<MenuDetail />} />
          <Route path="/menu-overview/:restaurantId/table/:tableNo" element={<MenuOverview />} />
          {/* <Route path="/menu-overview" element={<MenuOverview />} /> */}
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
      <Provider store={store}> {/* Provider the Redux store to the app */}
      <LocationProvider />
      </Provider>
    </Router>
  );
};

export default AppWrapper;
