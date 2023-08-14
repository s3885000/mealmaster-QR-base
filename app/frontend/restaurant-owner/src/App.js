import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon, FilterIcon, OnGoingIcon, QRCodeIcon, SearchIcon, ViewIcon} from './asset/icons/button';
import { Navigation, Buttons } from './components'
import './App.css';


const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/navigation" element={<Navigation />} /> 
      </Routes>
    </Router>
  );
};

export default App;
