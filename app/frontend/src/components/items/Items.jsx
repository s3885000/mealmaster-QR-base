import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Food_1, Food_2 } from '../../asset/images/restaurant_info/haidilao/food/index.js';
import { Buttons } from '../../components';

const ItemContainer = ({ children }) => (
  <div className="w-300 h-87 flex items-center p-2 rounded-md shadow-lg">
    {children}
  </div>
);

const Items = ({ type }) => {
  const [counter, setCounter] = useState(0);

const navigate = useNavigate();

  const handleDetailClick = () => {
      navigate('/menu-detail');
  };

  switch(type) {
    case 'food_item':
      return (
        <ItemContainer>
          <Food_1 className="w-24 h-24 rounded-2xl" />
          <div className="flex flex-col flex-grow ml-2">
            <p className="text-xl font-semibold">Neapolitan pizza</p>
            <p className="text-sm text-placeholders">Always a picnic favorite</p>
            <p className="text-xl font-semibold">200,000đ</p>
          </div>
          <div className="ml-2">
            <Buttons context='plus' count={counter} setCount={setCounter} onClick={handleDetailClick}/>
          </div>
        </ItemContainer>
      );
    case 'food_item_cart':
      return (
        <ItemContainer>
          <Food_2 className="w-16 h-16 rounded-3xl" />
          <div className="flex flex-col flex-grow ml-2">
            <p className="text-lg font-medium">Spicy fresh crab</p>
            <div className="flex items-center space-x-1.5 text-sm text-placeholders mb-1">
              <p>No Spice</p>
              <Buttons context='edit' />
            </div>
            <div className="flex items-center">
              <p className="text-xl font-medium ml-2">35,000đ</p>
            </div>
          </div>
          <div className="flex items-center">
            <Buttons context='minus' count={counter} setCount={setCounter} />
            <p className="mx-2 text-xl">{counter}</p>
            <Buttons context='plus' count={counter} setCount={setCounter} />
          </div>
        </ItemContainer>
      );
    case 'food_item_on_going':
      return (
        <ItemContainer>
          <Food_2 className="w-16 h-16 rounded-3xl" />
          <div className="flex flex-col flex-grow ml-2">
            <p className="text-lg font-medium">Spicy fresh crab</p>
            <p className="flex items-center space-x-1.5 text-sm text-placeholders mb-1">
              No Spice
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-lg ml-2">35,000đ</p>
          </div>
        </ItemContainer>
      );
    default:
      return null;
  }
};

export default Items;
