import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BestSeller, Burger, Pizza, Dessert, BestSellerActive, PizzaActive, BurgerActive, DessertActive } from '../../asset/icons/category/index.js';

const categories = [
  { name: 'Best Seller', Icon: BestSeller, ActiveIcon: BestSellerActive },
  { name: 'Pizza', Icon: Pizza, ActiveIcon: PizzaActive },
  { name: 'Burger', Icon: Burger, ActiveIcon: BurgerActive },
  { name: 'Dessert', Icon: Dessert, ActiveIcon: DessertActive },
  // Add more categories here
];

// Individual category component
const Category = ({name, Icon, ActiveIcon, isActive, onClick}) => (
  <li className="text-center w-1/3 sm:w-auto">
    <button 
      className={`flex flex-col items-center justify-center w-20 sm:w-24 h-20 sm:h-24 rounded-full ${isActive ? 'bg-white text-primary' : 'bg-white text-black'}`} 
      onClick={() => onClick(name)}
    >
      <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full flex shadow-md items-center justify-center ${isActive ? 'bg-primary shadow' : 'bg-white'}`}>
        {isActive ? <ActiveIcon /> : <Icon />}
      </div>
      <div className="mt-1 text-xs sm:text-sm">
        {name}
      </div>
    </button>
  </li>
);

Category.propTypes = {
  name: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  ActiveIcon: PropTypes.elementType,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

// Categories list component
const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('Best Seller');

  return (
    <div className="flex sm:justify-center justify-start items-center bg-white w-full h-20 sm:h-24 overflow-x-auto scrollbar-hide pl-2 sm:pl-0">
      <ul className="flex justify-start sm:justify-center items-center gap-2 sm:gap-4">
        {categories.map(category => (
          <Category 
            key={category.name} 
            name={category.name}
            Icon={category.Icon}
            ActiveIcon={category.ActiveIcon}
            isActive={category.name === activeCategory}
            onClick={setActiveCategory}
          />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
