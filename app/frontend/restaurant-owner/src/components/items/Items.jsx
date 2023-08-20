import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {AddIcon, DeleteIcon, DownloadIcon, DragDropIcon, EditIcon, FilterIcon, HideIcon, OnGoingIcon, SearchIcon, ViewIcon} from '../../asset/icons/button/index.js';
import { FoodTwo } from '../../asset/images/restaurant_info/haidilao/food/index.js';
import { Buttons } from '../../components'; 

const ItemContainer = ({ children, onClick }) => (
  <div 
    className="w-[380px] md:w-[700px] lg:w-[930px] xl:w-[1080px] 2xl:w-[1080px] h-16 md:h-[70px] lg:h-[70px] flex items-center bg-white rounded-md p-2 md:p-4"
    onClick={onClick}
  >
    {children}
  </div>
);

const ItemType = 'ITEM';

const DraggableItem = ({ children, id, onMove }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { id }
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        onMove(draggedItem.id, id);
        draggedItem.id = id;
      }
    }
  });

  return <div ref={(node) => ref(drop(node))}>{children}</div>;
};

const categoryTextColor = (state) => {
  switch(state) {
    case 'active':
      return 'text-primary';
    case 'inactive':
      return 'text-gray';
    default:
      return '';
  }
};

const foodItemTextColor = (iconState) => {
  switch(iconState) {
    case 'view':
      return 'text-primary';
    case 'hide':
      return 'text-gray';
    default:
      return '';
  }
};

const orderStatus = (status) => {
  switch(status) {
    case 'active':
      return 'text-primary';
    case 'inactive':
      return 'text-error'; 
    case 'in_progress':
      return 'text-gray';
    default:
      return '';
  }
};

const Items = ({ type, state: initialState, index, onMove, isSelected = false, onCheckboxChange }) => {
  const [state, setState] = useState(initialState);
  const [iconState, setIconState] = useState('view');
  
  const toggleState = () => {
    setState(prevState => (prevState === 'active' ? 'inactive' : 'active'));
  };

  const toggleIconState = () => {
    setIconState(prevState => (prevState === 'view' ? 'hide' : 'view'));
  };

  return (
    <DraggableItem id={index} onMove={onMove}>
      {renderSwitch(type, state, index, toggleState, iconState, toggleIconState, isSelected, onCheckboxChange)}
    </DraggableItem>
  );
};

const renderSwitch = (type, state, index, toggleState = null, iconState, toggleIconState, isSelected, onCheckboxChange) => {
  switch (type) {
    case 'tables':
      return (
        <ItemContainer>
          <div className="flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8">
            <input type="checkbox" className="mr-4" checked={isSelected} onChange={() => onCheckboxChange(index)}/>
            <span className="text-sm md:text-base lg:text-lg font-bold text-black">Table 1</span>
            <span className="text-xs md:text-sm lg:text-base font-bold text-gray">Near window</span>
          </div>
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-10">
            <button onClick={(e) => {
                e.stopPropagation();
                console.log('Download button clicked');
              }}
              className="bg-transparent border-none cursor-pointer w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
              <DownloadIcon />
            </button>
            <button onClick={(e) => {
                e.stopPropagation();
                console.log('Edit button clicked');
              }}
              className="bg-transparent border-none cursor-pointer w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
              <EditIcon />
            </button>
          </div>
        </ItemContainer>
      );

    case 'categories':
      const categoryColor = categoryTextColor(state);
      return (
        <ItemContainer onClick={toggleState}>
          <div className={`flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8`}>
            <input type="checkbox" className="mr-2" onClick={(e) => {e.stopPropagation();}} /> 
            <h2 className={`text-sm md:text-base lg:text-lg font-bold ${categoryColor}`}>Best Seller</h2>
          </div>
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-10">
            <button onClick={(e) => {
                e.stopPropagation();
                console.log('Edit button clicked');
              }}
              className="bg-transparent border-none cursor-pointer w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
              <EditIcon />
            </button>
            <DragDropIcon />
          </div>
        </ItemContainer>
      );

    case 'food_item':
      const foodColor = foodItemTextColor(iconState);
      return (
        <ItemContainer>
          <div className={`flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8`}>
            <input type="checkbox" className="mr-2" onClick={(e) => {e.stopPropagation();}} /> 
            <FoodTwo alt="Food Item" className="rounded-md mr-2 w-12 h-12" />
            <div>
              <h2 className={`text-sm md:text-base lg:text-lg font-bold ${foodColor}`}>Food Name</h2>
              <span className="text-xs md:text-sm lg:text-base text-gray">35,000 đ</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-10">
            <button onClick={(e) => {
                e.stopPropagation();
                toggleIconState();
                console.log(iconState === 'view' ? 'View button clicked' : 'Hide button clicked');
              }}
              className="bg-transparent border-none cursor-pointer w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
              {iconState === 'view' ? <ViewIcon /> : <HideIcon />}
            </button>
            <button onClick={(e) => {
                e.stopPropagation();
                console.log('Edit button clicked');
              }}
              className="bg-transparent border-none cursor-pointer w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
              <EditIcon />
            </button>
            <DragDropIcon />
          </div>
        </ItemContainer>
      );

    case 'orders':
      const orderColor = orderStatus(state);
      return (
        <ItemContainer>
          <div className={`flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8`}>
            <span className={`text-sm md:text-base lg:text-lg font-bold ${orderColor}`}>Order ID: #ABC123</span>
            <span className="text-xs md:text-sm lg:text-base text-black">Timestamp: 20/12/2023 12:48</span>
            <span className="text-xs md:text-sm lg:text-base text-black">Table: 15</span>
            <span className="text-xs md:text-sm lg:text-base text-black">Total: 1,500,000</span>
          </div>
          <Buttons context="details" />
        </ItemContainer>
      );

    default:
      return null;
  }
};

const WrappedItems = (props) => (
  <DndProvider backend={HTML5Backend}>
    <Items {...props} />
  </DndProvider>
);

export default WrappedItems;