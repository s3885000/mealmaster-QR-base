import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Header, Items, Buttons, Popups } from './components'; 
import { Dashboard, Login, OnGoing, PasswordRecovery, SignUp, Tables, Menu, History, Profile } from './screens'; 
import './App.css';

const App = () => {
  const [activePopup, setActivePopup] = useState(null); // State to keep track of the active popup

  // Show the specified popup
  const showPopup = (popupType) => {
    setActivePopup(popupType);
  };

  // Close the currently active popup
  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <Router>
      <div className="main-content flex justify-center items-center min-h-screen">
        <div className="items-container space-y-2.5">
        </div>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/password-recovery" element={<PasswordRecovery />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/history" element={<History />} /> 
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/on-going" element={<OnGoing />} />
          <Route path="/tables" element={<Tables />} />  
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </div>
      {activePopup && <Popups type={activePopup} onClose={closePopup} visible={true} />}
    </Router>
  );
};

export default App;




