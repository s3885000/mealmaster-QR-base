import React from 'react';
import { Categories, Information, Navigation, Items } from '../../components';
import './menuoverview.css';

const MenuOverview = () => {
  return (
    <div className='MenuOverview flex flex-col space-y-5 pb-20'>
      <Information type="address" />
      <Categories />
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item'></Items>
      <Items type='food_item_cart'></Items>
      <Items type='food_item_on_going'></Items>
      <Items type=''></Items>
      <Navigation />
    </div>
  );
};

export default MenuOverview;
