import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Header } from './components'
import './App.css';


const App = () => {
  return (
    <Router>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/navigation" element={<Navigation />} /> 
      </Routes>
    </Router>
  );
};

export default App;
