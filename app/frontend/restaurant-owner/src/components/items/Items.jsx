import React from 'react';
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon, FilterIcon, OnGoingIcon, SearchIcon, ViewIcon } from '../../asset/icons/button/index.js';

const ItemContainer = ({ children }) => {
  return (
    <div className="w-[380px] md:w-[700px] lg:w-[930px] xl:w-[1080px] 2xl:w-[1080px] h-16 md:h-[70px] lg:h-[70px] flex items-center bg-white rounded-md p-2 md:p-4">
      {children}
    </div>
  );
};

const Items = ({ type, state }) => {
  switch (type) {
    case 'tables':
      return (
        <ItemContainer className="flex justify-between items-center"> 
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-8"> 
            <input type="checkbox" className="mr-2" />
            <span className="text-sm md:text-base lg:text-lg font-bold text-black">Table 1</span>
            <span className="text-xs md:text-sm lg:text-base font-bold text-gray">Near window</span>
          </div>
          <div className="flex space-x-3 md:space-x-5 lg:space-x-10"> 
            <button onClick={() => console.log('Download button clicked')} className="ml-3 md:ml-5 lg:ml-8 w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
              <DownloadIcon />
            </button>
            <button onClick={() => console.log('Edit button clicked')} className="bg-transparent border-none cursor-pointer w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
              <EditIcon />
            </button>
          </div>
        </ItemContainer>
      );

    case 'categories':
      return (
        <ItemContainer>
          {/* Your categories design goes here based on the state (active or inactive) */}
          <div>Categories Content - {state}</div>
        </ItemContainer>
      );

    case 'food_item':
      return (
        <ItemContainer>
          {/* Your food item design goes here based on the state (active or inactive) */}
          <div>Food Item Content - {state}</div>
        </ItemContainer>
      );

    case 'orders':
      return (
        <ItemContainer>
          {/* Your orders design goes here based on the state (in_progress, active, or inactive) */}
          <div>Orders Content - {state}</div>
        </ItemContainer>
      );

    default:
      return null;
  }
};

export default Items;
