import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StarIcon, TimeIcon } from '../../asset/icons/box/index.js';
import { fetchRestaurantData } from '../../redux/actions/restaurantActions.js';


const Restaurant = ({ restaurant, loading, error, fetchRestaurantData, type }) => {
  let { restaurantId, tableNo } = useParams();

  const  bannerImage  =restaurant && restaurant.banner;

  const logoImage  = restaurant && restaurant.logo;

  useEffect(() => {
    fetchRestaurantData(restaurantId, tableNo);
  }, [tableNo, fetchRestaurantData, type, restaurantId]);


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
    <div className="relative">
      <div style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '160px', width: '100%' }} className="rounded-b-lg"></div>
      <div className="w-299 h-120 rounded-xl bg-white shadow-lg absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/3 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center pt-4 flex-wrap">
            <img src={logoImage} alt="Restaurant Logo" className="w-12 h-12 flex-shrink-0 rounded-full"/>  
            {restaurant && restaurant.name && <h1 className="pl-1 text-xl not-italic font-semibold tracking-wide truncate w-15">{restaurant.name}</h1>}
          </div>
          <div className="flex items-center justify-center text-xl pb-1.5">
            <StarIcon className="w-5 h-5" />
            <p className="text-teal-500 text-xs not-italic font-semibold">4.9 (284)</p>
            <TimeIcon className="w-5 h-5 ml-5" />
            <p className="text-teal-500 text-xs not-italic font-semibold">15-25 mins</p>
          </div>
        </div>
        <hr className="border border-gray w-267 h-1 mx-auto" />
        <div className="p-1 text-left">
          <p className="text-teal-500 mb-3 text-xl not-italic font-semibold">{content[type]}</p>
        </div>
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
  return {
    fetchRestaurantData: (restaurantId, tableNo) => dispatch(fetchRestaurantData(restaurantId, tableNo))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
