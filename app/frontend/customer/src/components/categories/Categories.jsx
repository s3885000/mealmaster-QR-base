import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { BestSeller, Burger, Pizza, Dessert, BestSellerActive, PizzaActive, BurgerActive, DessertActive } from '../../asset/icons/category/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantData } from '../../redux/actions/restaurantActions.js';
import { useParams } from 'react-router-dom';


const iconMapping = {
  "best-seller": { inactive: BestSeller, active: BestSellerActive },
  "burger": { inactive: Burger, active: BurgerActive },
  "pizza": { inactive: Pizza, active: PizzaActive },
  "dessert": { inactive: Dessert, active: DessertActive },
  "appetizer": { inactive: Appetizer, active: AppetizerActive },
  "noodles": { inactive: Noodles, active: NoodlesActive },
  "salad": { inactive: Salad, active: SaladActive },
  "rice": { inactive: Rice, active: RiceActive },
  "ice-cream": { inactive: iceCream, active: iceCreamActive },
  "seafood": { inactive: Seafood, active: SeafoodActive },
}

const Category = ({id, name, Icon, ActiveIcon, isActive, onClick}) => (
  <li className="text-center w-1/3 sm:w-auto">
    <button 
      className={`flex flex-col items-center justify-center rounded-full  ${isActive ? 'bg-white text-primary' : 'bg-white text-black'}`} 
      onClick={() => onClick(id)}
      style={{width: "105px", height: "105px"}}
    >
      <div className={`rounded-full flex shadow-lg items-center justify-center ${isActive ? 'bg-primary shadow' : 'bg-white'}`} style={{width: "66px", height: "66px"}}>
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

const Categories = ({ setActiveCategoryId, setActiveCategoryName }) => {
  const restaurantState = useSelector(state => state.restaurant);

  const { categories, loading, error } = restaurantState;
  const { restaurantId, tableNo } = useParams();
  
  const dispatch = useDispatch();
  const [activeCategoryId, _setActiveCategoryId] = useState(null);

  const setActiveCategory = useCallback((id, name) => {
    setActiveCategoryId(id);
    setActiveCategoryName(name);
    _setActiveCategoryId(id)
  }, [setActiveCategoryId, setActiveCategoryName]);

  useEffect(() => {
    dispatch(fetchRestaurantData(restaurantId, tableNo));
  }, [dispatch, restaurantId, tableNo]);
  
  useEffect(() => {
    // Set the initial active category to "Best Seller"
    const bestSellerCategory = categories.find(category => category.identifier === "best-seller");
    if (bestSellerCategory) {
      setActiveCategory(bestSellerCategory.id, bestSellerCategory.name);
    }
  }, [categories, setActiveCategory]);
  

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
    <div className=" flex sm:justify-center justify-start items-center bg-transparent mt-14 w-full overflow-x-auto overflow-y-hidden hide-scrollbar sm:pl-0">
      <ul className="flex justify-start sm:justify-center items-center gap-0 sm:gap-1">
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
              onClick={() => setActiveCategory(category.id, category.name) }
            />
          )
        })}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  setActiveCategoryId: PropTypes.func.isRequired,
  setActiveCategoryName: PropTypes.func.isRequired,
}

export default Categories;
