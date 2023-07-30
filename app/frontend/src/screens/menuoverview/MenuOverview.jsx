import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categories, Restaurant, Items } from '../../components';
import { HaidilaoBanner } from '../../asset/images/restaurant_info/haidilao/banner/index.js';
import './menuoverview.css';
import { useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';
//import { fetchRestaurantData } from '../../redux/actions/restaurantActions';
//import { fetchCategoryByRestaurant } from '../../redux/actions/categoryActions';

const MenuOverview = () => {
  const { restaurantId, tableNo } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dummyFetchRestaurantData = (restaurantId, tableNo) => {
    // return mock data
    console.log("Mock fetching restaurant data", restaurantId, tableNo);
  };

  const dummyFetchCategoryByRestaurant = (restaurantId) => {
    // return mock data
    console.log("Mock fetching categories data", restaurantId);
  };

  useEffect(() => {
    dispatch(updateType('table_number'));
    dummyFetchRestaurantData(restaurantId, tableNo);
    dummyFetchCategoryByRestaurant(restaurantId);
  }, [dispatch, restaurantId, tableNo]);

  // useEffect(() => {
  //   dispatch(updateType('table_number'));
  //   dispatch(fetchRestaurantData(restaurantId, tableNo));
  //   dispatch(fetchCategoryByRestaurant(restaurantId))
  // }, [dispatch, restaurantId, tableNo]);

  const handleDetailClick = () => {
      navigate('/menu-detail');
  };

  

  return (
    <div className='MenuOverview flex flex-col space-y-5 pb-20'>
      <Restaurant tableNo={tableNo}  restaurantId={restaurantId}/>
      <Categories />
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type='food_item' onClick={handleDetailClick}></Items>
      <Items type=''></Items>
    </div>
  );
};

export default MenuOverview;
