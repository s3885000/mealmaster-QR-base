import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BestSeller, Burger, Pizza, Dessert, BestSellerActive, PizzaActive, BurgerActive, DessertActive } from '../../asset/icons/category/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantData } from '../../redux/actions/restaurantActions.js';
import { useParams } from 'react-router-dom';

// const categories = [
//   { name: 'Best Seller', Icon: BestSeller, ActiveIcon: BestSellerActive },
//   { name: 'Pizza', Icon: Pizza, ActiveIcon: PizzaActive },
//   { name: 'Burger', Icon: Burger, ActiveIcon: BurgerActive },
//   { name: 'Dessert', Icon: Dessert, ActiveIcon: DessertActive },
//   // Add more categories here
// ];


const iconMapping = {
  "best-seller": { inactive: BestSeller, active: BestSellerActive },
  "burger": { inactive: Burger, active: BurgerActive },
  "pizza": { inactive: Pizza, active: PizzaActive },
  "dessert": { inactive: Dessert, active: DessertActive},
}

const Category = ({id, name, Icon, ActiveIcon, isActive, onClick}) => (
  <li className="text-center w-1/3 sm:w-auto">
    <button 
      className={`flex flex-col items-center justify-center rounded-full ${isActive ? 'bg-white text-primary' : 'bg-white text-black'}`} 
      onClick={() => onClick(id)}
      style={{width: "105px", height: "105px"}}
    >
      <div className={`rounded-full flex shadow-md items-center justify-center ${isActive ? 'bg-primary shadow' : 'bg-white'}`} style={{width: "66px", height: "66px"}}>
        {isActive ? <ActiveIcon /> : <Icon />}
      </div>
      <div className="mt-1 text-xs sm:text-sm">
        {name}
      </div>
    </button>
  </li>
);

Category.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  ActiveIcon: PropTypes.elementType,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Categories = ({ setActiveCategoryId }) => {
  const restaurantState = useSelector(state => state.restaurant);

  const { categories, loading, error } = restaurantState;
  const { restaurantId, tableNo } = useParams();
  
  const dispatch = useDispatch();
  const [activeCategoryId, _setActiveCategoryId] = useState(null);

  const setActiveCategory = (id) => {
    setActiveCategoryId(id);
    _setActiveCategoryId(id)
  }

  useEffect(() => {
    dispatch(fetchRestaurantData(restaurantId, tableNo));
  }, [dispatch, restaurantId, tableNo]);

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  // Sort best seller appear first
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.identifier === "best-seller") return -1;
    if (b.identifier === "best-seller") return 1;
    return 0;
  });

  return (
    <div className="flex sm:justify-center justify-start items-center bg-transparent mt-3 w-full overflow-x-auto overflow-y-hidden hide-scrollbar pl-2 sm:pl-0">
      <ul className="flex justify-start sm:justify-center items-center gap-2 sm:gap-4">
        { sortedCategories.map((category) => {
          const { inactive: Icon, active: ActiveIcon } = iconMapping[category.identifier];
          return (
            <Category 
              key={ category.id }
              id={ category.id }
              name={ category.name }
              Icon={ Icon }
              ActiveIcon={ ActiveIcon }
              isActive={ category.id === activeCategoryId }
              onClick={ setActiveCategory }
            />
          )
        })}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  setActiveCategoryId: PropTypes.func.isRequired
}

export default Categories;
