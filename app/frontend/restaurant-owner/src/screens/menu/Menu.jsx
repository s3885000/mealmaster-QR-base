import React, { useState } from 'react';
import { Buttons, Navigation, Header, Items } from '../../components'; 
import './menu.css';

const Menu = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [selectCategories, setSelectCategories] = useState(false);
    const [checkedCategories, setCheckedCategories] = useState(new Array(5).fill(false));

    const [selectFoodItems, setSelectFoodItems] = useState(false);
    const [checkedFoodItems, setCheckedFoodItems] = useState(new Array(8).fill(false));

    // Step 1: Convert allCategories and allFoodItems into state variables
    const [categories, setCategories] = useState(new Array(5).fill(0).map((_, idx) => idx));
    const [foodItems, setFoodItems] = useState(new Array(8).fill(0).map((_, idx) => idx + 4));

    const handleSelectAllCategories = () => {
        const newSelectCategories = !selectCategories;
        setSelectCategories(newSelectCategories);
        const newCheckedCategories = new Array(5).fill(newSelectCategories);
        setCheckedCategories(newCheckedCategories);
    };

    const handleSelectAllFoodItems = () => {
        const newSelectFoodItems = !selectFoodItems;
        setSelectFoodItems(newSelectFoodItems);
        setCheckedFoodItems(new Array(8).fill(newSelectFoodItems));
    };

    const handleCategoryCheckboxChange = (index) => {
        const newCheckedCategories = [...checkedCategories];
        newCheckedCategories[index] = !newCheckedCategories[index];
        setCheckedCategories(newCheckedCategories);
    };

    const handleFoodItemCheckboxChange = (index) => {
        const newCheckedFoodItems = [...checkedFoodItems];
        newCheckedFoodItems[index] = !newCheckedFoodItems[index];
        setCheckedFoodItems(newCheckedFoodItems);
    };

    // Step 2: Write a function to reorder arrays
    const moveItem = (arr, fromIndex, toIndex) => {
        const result = [...arr];
        const [removed] = result.splice(fromIndex, 1);
        result.splice(toIndex, 0, removed);
        return result;
    };

    const onMove = (dragIndex, hoverIndex) => {
        if (dragIndex < 4 && hoverIndex < 4) {
            const newOrder = moveItem(categories, dragIndex, hoverIndex);
            setCategories(newOrder);
        } else if (dragIndex >= 4 && hoverIndex >= 4) {
            const newOrder = moveItem(foodItems, dragIndex - 4, hoverIndex - 4);
            setFoodItems(newOrder);
        }
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
    
    // Step 4: Render Items components based on the current order
    const renderedCategories = categories.map(idx => renderCategory(idx));
    const renderedFoodItems = foodItems.map(idx => renderFoodItem(idx));

    return (
        <div className="menu-screen h-screen flex flex-col no-scrollbar">
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
                        <Buttons context="add_icon" />
                    </div>
                </div>
                {renderedCategories.map((category, idx) => (
                    <div key={idx} className='mb-5'>
                        {category}
                    </div>
                ))}
                
                <div className="flex justify-between items-center w-full mb-4 mt-10">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Food items</h1>
                        <button className="text-xl underline font-semibold" onClick={handleSelectAllFoodItems}>
                            Select all food items
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <Buttons context="delete" />
                        <Buttons context="add_icon" />
                    </div>
                </div>
                {renderedFoodItems.map((foodItem, idx) => (
                    <div key={idx} className='mb-5'>
                        {foodItem}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
