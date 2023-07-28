import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Categories, Information, Items } from '../../components';
import './menuoverview.css';

const MenuOverview = () => {

const navigate = useNavigate();

  const handleDetailClick = () => {
      navigate('/menu-detail');
  };
  return (
    <div className='MenuOverview flex flex-col space-y-5 pb-20'>
      <Information type="table_number" />
      <Categories />
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type=''></Items>
    </div>
  );
};

export default MenuOverview;
