import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon, FilterIcon, OnGoingIcon, QRCodeIcon, SearchIcon, ViewIcon} from './asset/icons/button';
import { Navigation, Buttons } from './components'

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="min-h-screen flex flex-col justify-center items-center space-y-4"> {/* Added centering styles */}
        <Buttons context='create_account_login' /> 
        <Buttons context='create_account_signup' /> 
        <Buttons context='login' />
        <Buttons context='already' />
        <Buttons context='email' />
        <Buttons context='cancel' />
        <Buttons context='on_going' />
        <Buttons context='update' />
        <Buttons context='details' />
        <Buttons context='accept' />
        <Buttons context='decline' />
        <Buttons context='save' />
        <Buttons context='ready' />
        <Buttons context='add_icon' />
        <Buttons context='download' />
        <Buttons context='delete' />
        <EditIcon />
        <FilterIcon />
        <OnGoingIcon />
        <QRCodeIcon />
        <SearchIcon />
        <ViewIcon />
      </div>
      <Routes>
        <Route path="/navigation" element={<Navigation />} /> 
      </Routes>
    </Router>
  );
};

export default App;
