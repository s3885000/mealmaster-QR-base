import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Header, Items, Buttons, Popups } from './components'; // Import Popups
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
      <Header />
      <Navigation />
      <div className="main-content flex justify-center items-center min-h-screen">
        <div className="items-container space-y-2.5">
          <Buttons context='update' onClick={() => showPopup('alert')} />
          <Buttons context='update' onClick={() => showPopup('add_table')} />
          <Buttons context='update' onClick={() => showPopup('edit_table')} />
          <Buttons context='update' onClick={() => showPopup('add_category')} />
          <Buttons context='update' onClick={() => showPopup('edit_category')} />
          <Buttons context='update' onClick={() => showPopup('add_food')} />
          <Buttons context='update' onClick={() => showPopup('edit_food')} />
          <Buttons context='update' onClick={() => showPopup('history')} />
          <Buttons context='update' onClick={() => showPopup('order_details_inprogress')} />
          <Buttons context='update' onClick={() => showPopup('order_details_ready')} />
        </div>
        <Routes>
          <Route path="/navigation" element={<Navigation />} /> 
        </Routes>
      </div>
      {activePopup && <Popups type={activePopup} onClose={closePopup} visible={true} />}
    </Router>
  );
};

export default App;


