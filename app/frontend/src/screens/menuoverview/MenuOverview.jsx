import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categories, Restaurant, Items } from '../../components';
// import { HaidilaoBanner } from '../../asset/images/restaurant_info/haidilao/banner/index.js';
import './menuoverview.css';
import { useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';
import { fetchRestaurantData } from '../../redux/actions/restaurantActions';

const MenuOverview = () => {
  const { restaurantId, tableNo } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Define state for active category ID and a function to update it
  const [activeCategoryId, setActiveCategoryId] = useState(null);


  useEffect(() => {
    dispatch(updateType('table_number'));
    dispatch(fetchRestaurantData(restaurantId, tableNo));
  }, [dispatch, restaurantId, tableNo]);

  const handleDetailClick = () => {
      navigate('/menu-detail');
  };

  

  return (
    <div className='MenuOverview flex flex-col'>
      <Restaurant tableNo={tableNo}  restaurantId={restaurantId}/>
      <Categories setActiveCategoryId={setActiveCategoryId}/>
      { activeCategoryId && <Items type='food_item' restaurantId={restaurantId} categoryId={activeCategoryId} onClick={handleDetailClick}/> }

    </div>
  );
};

export default MenuOverview;
