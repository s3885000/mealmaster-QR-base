import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Categories, Restaurant, Items } from '../../components';
import './menuoverview.css';
import { useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';

const MenuOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableNo = 5;

  useEffect(() => {
    dispatch(updateType('table_number'));
  }, [dispatch]);

  const handleDetailClick = () => {
      navigate('/menu-detail');
  };

  

  return (
    <div className='MenuOverview flex flex-col space-y-5 pb-20'>
      <Restaurant tableNo={tableNo} />
      <Categories />
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type=''></Items>
    </div>
  );
};

export default MenuOverview;
