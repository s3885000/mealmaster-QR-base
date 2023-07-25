import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HaidilaoLogo } from '../../asset/images/restaurant_info/haidilao/logo/index.js';
import { Food_1, Food_2 } from '../../asset/images/restaurant_info/haidilao/food/index.js';
import { Buttons, Popups } from '../../components'; 
import { StarIcon, TimeIcon } from '../../asset/icons/box/index.js';

const ItemContainer = ({ children }) => (
  <div className="w-300 h-87 flex items-center p-2 rounded-md shadow-lg">
    {children}
  </div>
);

const Items = ({ type }) => {
  const [counter, setCounter] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);

  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate('/menu-detail');
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  }

  switch(type) {
    case 'food_item':
      return (
        <ItemContainer>
          <Food_1 className="w-24 h-24 rounded-2xl" onClick={handleDetailClick} />
          <div className="flex flex-col flex-grow ml-2">
            <p className="text-xl font-semibold">Neapolitan pizza</p>
            <p className="text-sm text-placeholders">Always a picnic favorite</p>
            <p className="text-xl font-semibold">200,000đ</p>
          </div>
          <div className="ml-2">
            <Buttons context='plus' count={counter} setCount={setCounter}/>
          </div>
        </ItemContainer>
      );
    case 'food_item_cart':
      return (
        <>
          <ItemContainer>
            <Food_2 className="w-16 h-16 rounded-3xl" />
            <div className="flex flex-col flex-grow ml-2">
              <p className="text-lg font-medium">Spicy fresh crab</p>
              <div className="flex items-center space-x-1.5 text-sm text-placeholders mb-1">
                <p>No Spice</p>
                <Buttons context='edit' onClick={togglePopup} />
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
          <Popups type="notes" visible={popupVisible} /> {/* Popup */}
        </>
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
    case 'nearby_restaurant':
      return (
        <div className="w-44 h-48 rounded-xl border border-transparent flex flex-col items-center shadow-lg">
          <HaidilaoLogo className="w-44 h-30 rounded-t-xl" />
          <div className="p-2 text-center h-18 flex flex-col justify-between">
            <h1 className="font-bold text-base text-black overflow-ellipsis whitespace-nowrap overflow-hidden">Haidilao - Đồng Khởi</h1>
            <div className="flex items-center text-base text-primary">
              <StarIcon className="w-3 h-3"/>
              <p className="font-medium text-sm ml-1">4.9 (284)</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center text-base text-primary">
                <TimeIcon className="w-3 h-3"/>
                <p className="font-medium text-sm ml-1">15-25 mins</p>
              </div>
              <p className="font-medium text-sm text-primary">0.2km</p>
            </div>
          </div>
        </div>
      );
    case 'home_history':
      return (
        <div className="w-44 h-48 rounded-xl border border-transparent flex flex-col items-center shadow-lg">
          <HaidilaoLogo className="w-44 h-30 rounded-t-xl" />
          <div className="p-2 text-center h-18 flex flex-col justify-between">
            <h1 className="font-bold text-base text-black overflow-ellipsis whitespace-nowrap overflow-hidden">Haidilao - Đồng Khởi</h1>
            <div className="flex items-center text-base ">
              <p className="font-medium text-sm ml-1">Date: 7th May 2023</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center text-base">
                <p className="font-medium text-sm ml-1">Items: 3</p>
              </div>
              <p className="font-bold text-sm text-primary">81.000 đ</p>
            </div>
          </div>
        </div>
        );
    default:
      return null;
  }
};

export default Items;
