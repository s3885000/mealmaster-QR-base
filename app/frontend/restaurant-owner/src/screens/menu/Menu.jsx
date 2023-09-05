import React, { useState } from 'react';
import { Buttons, Navigation, Header, Items, Popups } from '../../components'; 
import { DndProvider } from 'react-dnd';
import { MultiBackend, HTML5DragTransition, TouchTransition } from 'react-dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import './menu.css';

const Menu = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [selectCategories, setSelectCategories] = useState(false);
    const [checkedCategories, setCheckedCategories] = useState(new Array(5).fill(false));

    const [selectFoodItems, setSelectFoodItems] = useState(false);
    const [checkedFoodItems, setCheckedFoodItems] = useState(new Array(8).fill(false));

    const [categories, setCategories] = useState(new Array(5).fill(0).map((_, idx) => idx));
    const [foodItems, setFoodItems] = useState(new Array(8).fill(0).map((_, idx) => idx + 4));

    const [isAddCategoryPopupVisible, setIsAddCategoryPopupVisible] = useState(false);
    const [isAddFoodItemPopupVisible, setIsAddFoodItemPopupVisible] = useState(false);

    const handleSelectAllCategories = () => {
        const newSelectCategories = !selectCategories;
        setSelectCategories(newSelectCategories);
        const newCheckedCategories = new Array(5).fill(newSelectCategories);
        setCheckedCategories(newCheckedCategories);
    };

    const handleSelectAllFoodItems = () => {
        const newSelectFoodItems = !selectFoodItems;
        setSelectFoodItems(newSelectFoodItems);
        setCheckedFoodItems(new Array(foodItems.length).fill(newSelectFoodItems));
    };    

    const handleCategoryCheckboxChange = (index) => {
        const newCheckedCategories = [...checkedCategories];
        newCheckedCategories[index] = !newCheckedCategories[index];
        setCheckedCategories(newCheckedCategories);
    };

    const handleFoodItemCheckboxChange = (index) => {
        const actualIndex = index - 4; 
        const newCheckedFoodItems = [...checkedFoodItems];
        newCheckedFoodItems[actualIndex] = !newCheckedFoodItems[actualIndex];
        setCheckedFoodItems(newCheckedFoodItems);
    };

    const onMove = (dragType, dragIndex, hoverIndex) => {
        if (dragType === 'categories') {
            const newOrder = moveItem(categories, dragIndex, hoverIndex);
            setCategories(newOrder);
        } else if (dragType === 'food_item') {
            const newOrder = moveItem(foodItems, dragIndex, hoverIndex);
            setFoodItems(newOrder);
        }
    };
    
    const moveItem = (arr, fromIndex, toIndex) => {
        const result = [...arr];
        const [removed] = result.splice(fromIndex, 1);
        result.splice(toIndex, 0, removed);
        return result;
    };

    const renderCategory = (idx) => (
        <Items 
            key={idx} 
            type="categories"
            state={idx === activeCategoryIndex ? 'active' : 'inactive'}
            isSelected={checkedCategories[idx]} 
            index={idx} 
            onCheckboxChange={handleCategoryCheckboxChange}
            onCategoryClick={() => setActiveCategoryIndex(idx)}
            onMove={onMove}
        />
    );

    const renderFoodItem = (idx) => (
        <Items 
            key={idx} 
            type="food_item"
            isSelected={checkedFoodItems[idx - 4]}
            index={idx} 
            onCheckboxChange={handleFoodItemCheckboxChange}
            onMove={onMove}
        />
    );
    
    const renderedCategories = categories.map(idx => renderCategory(idx));
    const renderedFoodItems = foodItems.map(idx => renderFoodItem(idx));

    return (
        <DndProvider backend={MultiBackend} options={{
            backends: [
              {
                backend: HTML5Backend,
                transition: HTML5DragTransition
              },
              {
                backend: TouchBackend,
                options: { enableMouseEvents: true },
                transition: TouchTransition
              }
            ]
        }}>       
        <div className="menu-screen h-screen flex flex-col no-scrollbar">
            {isAddCategoryPopupVisible && 
                <Popups visible={isAddCategoryPopupVisible} type="add_category" onClose={() => setIsAddCategoryPopupVisible(false)} />}
            <Header title="Menu" className="flex flex-col items-start" />
            <Navigation className="flex-none" />
            <div className="flex-grow flex flex-col items-start mt-5 px-8">
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Categories</h1>
                        <button className="text-xl underline font-semibold" onClick={handleSelectAllCategories}>
                            Select all categories
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <Buttons context="delete" />
                        <Buttons context="add_icon" onClick={() => setIsAddCategoryPopupVisible(true)}/>
                    </div>
                </div>
                {renderedCategories.map((category, idx) => (
                    <div key={idx} className='mb-5'>
                        {category}
                    </div>
                ))}
                
                <div className="flex justify-between items-center w-full mb-4 mt-10">
                    <div>
                    {isAddFoodItemPopupVisible && 
                        <Popups visible={isAddFoodItemPopupVisible} type="add_food" onClose={() => setIsAddFoodItemPopupVisible(false)} />}
                        <h1 className="text-3xl font-bold mb-2">Food items</h1>
                        <button className="text-xl underline font-semibold" onClick={handleSelectAllFoodItems}>
                            Select all food items
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <Buttons context="delete" />
                        <Buttons context="add_icon" onClick={() => setIsAddFoodItemPopupVisible(true)}/>
                    </div>
                </div>
                {renderedFoodItems.map((foodItem, idx) => (
                    <div key={idx} className='mb-5'>
                        {foodItem}
                    </div>
                ))}
            </div>
        </div>
        </DndProvider>
    );
};

export default Menu;
