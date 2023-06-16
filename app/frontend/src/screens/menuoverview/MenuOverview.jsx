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
      <Items type='food_item'></Items>
      <Navigation />
    </div>
  );
};

export default MenuOverview;
