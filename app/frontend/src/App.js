import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Boxes, Buttons, Categories, Header, Information, Items, Navigation, Popups} from './components'
import {Activity, Cart, Home, Login, LoginPassword, MenuDetail, MenuOverview, Payment, Profile, ScanQR, Signin} from './screens'
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login-password" element={<LoginPassword />} />
        <Route path="/login-password" element={<LoginPassword />} />
        <Route path="/login-password" element={<LoginPassword />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/boxes" element={<Boxes />} />
        <Route path="/scanqr" element={<ScanQR />} />
        <Route path="/menu-overview" element={<MenuOverview />} />
      </Routes>
    </Router>
  );
};

export default App;