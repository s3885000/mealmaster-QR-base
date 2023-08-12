import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categories, Restaurant, Items } from '../../components';
import './menuoverview.css';
import { useDispatch } from 'react-redux';
import { updateType } from '../../redux/actions/typeActions';
import { fetchRestaurantData } from '../../redux/actions/restaurantActions';
import { fetchBestSellers } from '../../redux/actions/menuItemsActions';

const MenuOverview = () => {
  const { restaurantId, tableNo } = useParams();
  console.log("Categories restaurantId:", restaurantId);
  console.log("Categories tableNo:", tableNo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Define state for active category ID and a function to update it
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  //Display category's name
  const [activeCategoryName, setActiveCategoryName] = useState(null);

  useEffect(() => {
    dispatch(updateType('table_number'));
    dispatch(fetchRestaurantData(restaurantId, tableNo));
    dispatch(fetchBestSellers(restaurantId))
  }, [dispatch, restaurantId, tableNo]);

  const handleDetailClick = () => {
      navigate('/menu-detail');
  };

  return (
    <div className='MenuOverview flex flex-col'>
      <Restaurant tableNo={tableNo}  restaurantId={restaurantId}/>
      <Categories setActiveCategoryId={setActiveCategoryId} setActiveCategoryName={setActiveCategoryName}/>
      { activeCategoryName && <h2 className="pl-6 pt-4 text-2xl not-italic font-medium">{activeCategoryName}</h2> }

      { !activeCategoryId && <Items type='best_sellers' restaurantId={restaurantId} /> }
      { activeCategoryId && <Items type='food_item' restaurantId={restaurantId} categoryId={activeCategoryId} onClick={handleDetailClick}/> }

    </div>
  );
};

export default MenuOverview;
