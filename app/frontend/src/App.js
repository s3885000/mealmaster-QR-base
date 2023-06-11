import React from 'react';

import {Boxes, Buttons, Categories, Header, Navigation, Popups} from './components'
import {Activity, Cart, Home, Login, MenuDetail, MenuOverview, Payment, Profile, Scanqr, Signin} from './screens'
import './App.css';

const App = () => {
  return (
    <div className='App'>
        <Header></Header>
        <Popups></Popups>
        <Buttons context='apply'></Buttons>
        <Buttons context='plus'></Buttons>
        <Buttons context='minus'></Buttons>
        <Buttons context='cart'></Buttons>
        <Buttons context='back'></Buttons>
        <Buttons context='self_pickup'></Buttons>
        <Buttons context='serve_to_table'></Buttons>
        <Categories></Categories>
        <Navigation></Navigation>
    </div>
  );
}

export default App;
