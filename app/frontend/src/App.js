import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { OnGoing, Cart, Home, Login, LoginPassword, MenuDetail, MenuOverview, Payment, Profile, ScanQR, SignUp, NearbyRestaurant } from './screens';
import { Boxes, Navigation, Popups} from './components'
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'

const App = () => {
  const location = useLocation(); 
  const noNavBarScreens = ['/menu-detail', '/cart', '/on-going', '/payment', '/nearby-restaurants'];

  return (
    <>
      <div className="pb-16">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-password" element={<LoginPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/scanqr" element={<ScanQR />} />
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/on-going" element={<OnGoing />} />
          <Route path="/menu-detail" element={<MenuDetail />} />
          {/* <Route path="/restaurant/:restaurantId/table/:tableNo" element={<MenuOverview />} /> */}
          <Route path="/menu-overview" element={<MenuOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/nearby-restaurants" element={<NearbyRestaurant />} /> 
          <Route path="/popups" element={<Popups />} />
        </Routes>
      </div>
      {!noNavBarScreens.includes(location.pathname) && <Navigation />}
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <Provider store={store}> {/* Provider the Redux store to the app */}
      <App/>
      </Provider>
    </Router>
  );
};

export default AppWrapper;
