import React from 'react';
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon, FilterIcon, OnGoingIcon, QRCodeIcon, SearchIcon, ViewIcon } from '../../asset/icons/button/index.js';

const ItemContainer = ({ children }) => {
  return (
    <div className="item-container">
      {children}
    </div>
  );
};

const Items = ({ type, state }) => {
  switch (type) {
    case 'tables':
      return (
        <ItemContainer>
          {/* Your table design goes here */}
          <div>Table Content</div>
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
