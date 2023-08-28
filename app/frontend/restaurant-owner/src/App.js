import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Popups } from './components'; 
import { Dashboard, Login, OnGoing, PasswordRecovery, SignUp, Tables, Menu, History, Profile } from './screens'; 
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activePopup, setActivePopup] = useState(null); 

  const showPopup = (popupType) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="main-content min-h-screen overflow-y-auto">
        <div className="items-container space-y-2.5">
        </div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/password-recovery" element={<PasswordRecovery />} /> 
          <Route path="/history" element={<History />} /> 
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/on-going" element={<OnGoing />} />
          <Route path="/tables" element={<Tables />} />  
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </div>
      {activePopup && <Popups type={activePopup} onClose={closePopup} visible={true} />}
    </>
  );
};


const LocationProvider = () => {
  const location = useLocation();
  return <App location={location} />;
};

const AppWrapper = () => {
  return (
    <Router>
      <Provider store={store}>
          <LocationProvider />
      </Provider>
    </Router>
  );
};

export default AppWrapper;
