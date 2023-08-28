import React, { useState, memo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DownloadIcon, DragDropIcon, EditIcon, HideIcon, ViewIcon } from '../../asset/icons/button/index.js';
import { FoodTwo } from '../../asset/images/restaurant_info/haidilao/food/index.js';
import { Buttons, Popups } from '../../components';

const ItemContainer = ({ children, onClick }) => (
  <div 
  className="flex w-5/6 justify-center min-w-[375px] md:min-w-[725px] lg:min-w-[910px] xl:min-w-[1295px] 2xl:min-w-[1400px] h-16 md:h-[70px] lg:h-[70px] bg-white rounded-md p-4"
    onClick={onClick}>
    {children}
  </div>
);

const ItemType = 'ITEM';

const DraggableItem = ({ children, id, onMove, type }) => {
  const [, ref] = useDrag({
      type: ItemType,
      item: { id, type }
  });

  const [, drop] = useDrop({
      accept: ItemType,
      hover: (draggedItem) => {
          if (draggedItem.id !== id) {
              onMove(draggedItem.type, draggedItem.id, id);
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
    default:
      return 'text-gray';
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
    case 'in_progress':
      return 'text-gray';
    default:
      return '';
  }
};

const historyStatus = (status) => {
  switch(status) {
    case 'success':
      return 'text-primary';
    case 'failed':
      return 'text-error'; 
    default:
      return '';
  }
};

const Items = memo(({ type, state, index, onMove, isSelected = false, onCheckboxChange, onCategoryClick }) => {
  const [iconState, setIconState] = useState('view');
  const [isEditTablePopupVisible, setIsEditTablePopupVisible] = useState(false);
  const [isEditCategoryPopupVisible, setIsEditCategoryPopupVisible] = useState(false);
  const [isEditFoodItemPopupVisible, setIsEditFoodItemPopupVisible] = useState(false);
  const [isDetailPopupVisible, setIsDetailPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState('');
  
  const toggleIconState = () => {
    setIconState(prevState => (prevState === 'view' ? 'hide' : 'view'));
  };

  const showDetailPopup = (type) => {
    console.log("showDetailPopup called with type:", type);
    setPopupType(type);
    setIsDetailPopupVisible(true);
  }

  return (
    <>
    {isEditTablePopupVisible && <Popups visible={isEditTablePopupVisible} type="edit_table" onClose={() => setIsEditTablePopupVisible(false)} />}
    {isEditCategoryPopupVisible && <Popups visible={isEditCategoryPopupVisible} type="edit_category" onClose={() => setIsEditCategoryPopupVisible(false)} />}
    {isEditFoodItemPopupVisible && <Popups visible={isEditFoodItemPopupVisible} type="edit_food" onClose={() => setIsEditFoodItemPopupVisible(false)} />}
    {isDetailPopupVisible && <Popups visible={isDetailPopupVisible} type={popupType} onClose={() => setIsDetailPopupVisible(false)} />}
    { (type === 'categories' || type === 'food_item') ? (
        <DraggableItem id={index} onMove={onMove} type={type}>
            {renderSwitch(type, state, index, iconState, toggleIconState, isSelected, onCheckboxChange, onCategoryClick, setIsEditTablePopupVisible, setIsEditCategoryPopupVisible, setIsEditFoodItemPopupVisible, showDetailPopup)}
        </DraggableItem>
    ) : (
        renderSwitch(type, state, index, iconState, toggleIconState, isSelected, onCheckboxChange, onCategoryClick, setIsEditTablePopupVisible, setIsEditCategoryPopupVisible, setIsEditFoodItemPopupVisible, showDetailPopup)
    )}
  </>
  );
});

const renderSwitch = (type, state, index, iconState, toggleIconState, isSelected, onCheckboxChange, onCategoryClick, setIsEditTablePopupVisible, setIsEditCategoryPopupVisible, setIsEditFoodItemPopupVisible, showDetailPopup) => {
    switch (type) {
        case 'tables':
            return (
                <ItemContainer>
                    <div className="flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8">
                        <input type="checkbox" className="mr-4" checked={isSelected} onChange={() => onCheckboxChange(index)} />
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
                            setIsEditTablePopupVisible(true);
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
              <ItemContainer onClick={onCategoryClick}>
                <div className={`flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8`}>
                  <input type="checkbox" className="mr-2" onClick={(e) => {e.stopPropagation();}} checked={isSelected} onChange={() => onCheckboxChange(index)} /> 
                  <h2 className={`text-sm md:text-base lg:text-lg font-bold ${categoryColor}`}>Best Seller</h2>
                </div>
                <div className="flex items-center space-x-3 md:space-x-5 lg:space-x-10">
                  <button onClick={(e) => {
                      e.stopPropagation();
                      setIsEditCategoryPopupVisible(true);
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
                    <input type="checkbox" className="mr-2" checked={isSelected} onChange={(e) => {e.stopPropagation();onCheckboxChange(index);}} />
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
                            setIsEditFoodItemPopupVisible(true);
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
            let popupToShow; 
            if (state === 'active') {
                popupToShow = 'order_details_ready';
            } else if (state === 'in_progress') {
                popupToShow = 'order_details_inprogress';
            }
  
          return (
              <ItemContainer>
                  <div className={`flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8`}>
                      <span className={`text-sm md:text-base lg:text-lg font-bold ${orderColor}`}>Order ID: #ABC123</span>
                      <span className="text-xs md:text-sm lg:text-base text-black">Timestamp: 20/12/2023 12:48</span>
                      <span className="text-xs md:text-sm lg:text-base text-black">Table: 15</span>
                      <span className="text-xs md:text-sm lg:text-base bold text-black">Item(s): 3</span> 
                      <span className="text-xs md:text-sm lg:text-base text-black">Total: 1,500,000</span>
                  </div>
                  <Buttons context="details" onClick={() => showDetailPopup(popupToShow)}/>  
              </ItemContainer>
          );

        case 'history':
          const historyColor = historyStatus(state);
          return (
            <ItemContainer>
                <div className={`flex-grow flex items-center space-x-3 md:space-x-5 lg:space-x-8`}>
                    <span className={`text-sm md:text-base lg:text-lg font-bold ${historyColor}`}>Order ID: #ABC123</span>
                    <span className="text-xs md:text-sm lg:text-base text-black">Timestamp: 20/12/2023 12:48</span>
                    <span className="text-xs md:text-sm lg:text-base text-black">Table: 15</span>
                    <span className="text-xs md:text-sm lg:text-base text-black">Total: 1,500,000</span>
                </div>
                <Buttons context="details" onClick={() => showDetailPopup('history')}/>  
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
