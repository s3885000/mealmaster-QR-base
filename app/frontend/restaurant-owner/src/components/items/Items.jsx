import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AddIcon, DeleteIcon, DownloadIcon, DragDropIcon, EditIcon, FilterIcon, HideIcon, OnGoingIcon, SearchIcon, ViewIcon } from '../../asset/icons/button/index.js';

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

const Items = ({ type, state: initialState, index, onMove }) => {
  const [state, setState] = useState(initialState);
  
  const toggleState = () => {
    setState(prevState => (prevState === 'active' ? 'inactive' : 'active'));
  };

  return (
    type === 'tables' 
      ? renderSwitch(type, state, index) 
      : <DraggableItem id={index} onMove={onMove}>
          {renderSwitch(type, state, index, toggleState)}
        </DraggableItem>
  );
};

const renderSwitch = (type, state, index, toggleState = null) => {
  switch (type) {
    case 'tables':
      return (
        <ItemContainer className="flex justify-between items-center"> 
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-8"> 
            <input type="checkbox" className="mr-2" />
            <span className="text-sm md:text-base lg:text-lg font-bold text-black">Table 1</span>
            <span className="text-xs md:text-sm lg:text-base font-bold text-gray">Near window</span>
          </div>
          <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-10"> 
            <button onClick={(e) => {
                e.stopPropagation(); 
                console.log('Download button clicked');
              }} 
              className="ml-3 md:ml-5 lg:ml-8 w-5 md:w-6 lg:w-auto h-5 md:h-6 lg:h-auto">
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
      const textColor = state === 'active' ? 'text-primary' : 'text-gray';

      return (
        <ItemContainer 
          className="flex justify-between items-center"
          onClick={toggleState}
        >
          <div className={`flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8`}> 
            <h2 className={`text-sm md:text-base lg:text-lg font-bold ${textColor}`}>Best Seller</h2>
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
      // ... existing 'food_item' code ...

    case 'orders':
      // ... existing 'orders' code ...

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
