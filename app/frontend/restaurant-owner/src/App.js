import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Header, Items } from './components'
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Navigation />
      <div className="main-content">
        <Items type="tables" />
        <Items type="categories" state="active" />
        <Items type="categories" state="inactive" />
        <Items type="food_item" state="active" />
        <Items type="food_item" state="inactive" />
        <Items type="orders" state="in_progress" />
        <Items type="orders" state="active" />
        <Items type="orders" state="inactive" />
        <Routes>
          <Route path="/navigation" element={<Navigation />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
