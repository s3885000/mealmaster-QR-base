import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { HaidilaoLogoMini } from '../../asset/images/restaurant_info/haidilao/logo/index.js';
import { StarIcon, TimeIcon } from '../../asset/icons/box/index.js';
//import { fetchRestaurantData } from '../../redux/actions/restaurantActions.js';


const Restaurant = ({ restaurant, loading, error, fetchRestaurantData, type }) => {
  let { restaurantId, tableNo } = useParams();

  const [restaurantData, setRestaurantData] = useState({});

  const dummyFetchRestaurantData = (restaurantId, tableNo) => {
    // return mock data
    return {
      name: "Mock Restaurant",
      table: "Mock Table"
    };
  };


  // useEffect(() => {
  //   fetchRestaurantData(restaurantId, tableNo);
  // }, [tableNo, fetchRestaurantData, type, restaurantId]);

  useEffect(() => {
    setRestaurantData(dummyFetchRestaurantData(restaurantId, tableNo));
  }, [tableNo, restaurantId]);
  

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>
  }

  const content = {
    table_number: `Table No.${tableNo}`,
    address: 'L3 Vincom Center, 72 Lê Thánh Tôn, P. Bến Nghé, Quận 1, TP. HCM.',
  };

  return (
    <div className="w-120 h-auto border border-placeholders mx-auto justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <HaidilaoLogoMini className="w-16 h-16 rounded-full" />
          {restaurant && restaurant.name && <h1 className="ml-2 text-xl font-bold">{restaurantData.name}</h1>}
        </div>
        <div className="flex items-center justify-center text-xl mt-2">
          <StarIcon className="w-5 h-5" />
          <p className="ml-1 text-primary">4.9 (284)</p>
          <TimeIcon className="w-5 h-5 ml-4" />
          <p className="ml-1 text-primary">15-25 mins</p>
        </div>
      </div>
      <hr className="border border-placeholders w-4/5 mx-auto" />
      <div className="p-2 text-center">
        <p className="mb-2 text-l">{content[type]}</p>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    restaurant: state.restaurant.restaurant,
    table: state.restaurant.table,
    loading: state.restaurant.loading,
    error: state.restaurant.error,
    type: state.type,
  }
}

const mapDispatchToProps = dispatch => {
  // return {
  //   fetchRestaurantData: (restaurantId, tableNo) => dispatch(fetchRestaurantData(restaurantId, tableNo))
  // }

  return {
    fetchRestaurantData: (restaurantId, tableNo) => { console.log('Mock fetching')}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
