import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Popups } from './components'

const App = () => {
  return (
    // <Router>
    //   <Navigation />
    //   <Routes>
    //     <Route path="/navigation" element={<Navigation />} /> 
    //   </Routes>
    // </Router>
    <Popups type="add_category" showPopup="show"/>
  );
};

export default App;
