import React from 'react';

import {Boxes, Buttons, Header, Navigation, Popups} from './components'
import {Activity, Cart, Home, Login, MenuDetail, MenuOverview, Payment, Profile, Scanqr, Signin} from './screens'

import './App.css';

const App = () => {
  return (
    <div className='App'>
        <Buttons context="continue"></Buttons>
        <Buttons context="payment"></Buttons>
        <Buttons context="guest"></Buttons>
        <Buttons context="self_pickup"></Buttons>
        <Buttons context="serve_to_table"></Buttons>
        <Buttons context="plus"></Buttons>
        <Buttons context="minus"></Buttons>
        <Buttons context="cart"></Buttons>
        <Popups></Popups>
    </div>
  );
}

export default App;
