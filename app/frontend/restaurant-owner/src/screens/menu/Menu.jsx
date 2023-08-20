import React, { useState } from 'react';
import { Buttons, Navigation, Header, Items } from '../../components'; 

const Menu = () => {
    // State to manage the checkbox selection for categories and food items
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [selectCategories, setSelectCategories] = useState(false);
    const [checkedCategories, setCheckedCategories] = useState(new Array(5).fill(false));

    const [selectFoodItems, setSelectFoodItems] = useState(false);
    const [checkedFoodItems, setCheckedFoodItems] = useState(new Array(30).fill(false)); // 5 categories * 6 food items

    const handleSelectAllCategories = () => {
        const newSelectCategories = !selectCategories;
        setSelectCategories(newSelectCategories);
        // Update all checkboxes in the checkedCategories array
        const newCheckedCategories = new Array(5).fill(newSelectCategories);
        setCheckedCategories(newCheckedCategories);
    };

    const handleSelectAllFoodItems = () => {
        const newSelectFoodItems = !selectFoodItems;
        setSelectFoodItems(newSelectFoodItems);
        setCheckedFoodItems(new Array(30).fill(newSelectFoodItems));
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

    const renderCategory = (idx) => (
        <Items 
            key={idx} 
            type="categories"
            state={idx === activeCategoryIndex ? 'active' : 'inactive'}
            isSelected={checkedCategories[idx]} 
            index={idx} 
            onCheckboxChange={handleCategoryCheckboxChange}
            onCategoryClick={() => setActiveCategoryIndex(idx)}
        />
    );

    const renderFoodItem = (idx) => (
        <Items 
            key={idx} 
            type="food_item" 
            isSelected={checkedFoodItems[idx]} 
            index={idx} 
            onCheckboxChange={handleFoodItemCheckboxChange}
        />
    );

    const allCategories = new Array(5).fill(0).map((_, idx) => renderCategory(idx));
    const allFoodItems = new Array(30).fill(0).map((_, idx) => renderFoodItem(idx));

    return (
        <div className="menu-screen h-screen flex flex-col">
            <Header title="Menu" className="flex flex-col items-center" />
            <Navigation className="flex-none" />
            <div className="flex-grow flex flex-col items-start mt-5 px-8 overflow-y-auto">
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Categories</h1>
                        <button className="text-xl underline font-semibold" onClick={handleSelectAllCategories}>
                            Select all categories
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <Buttons context="delete" />
                        <Buttons context="add_icon" />
                    </div>
                </div>
                {allCategories.map((category, idx) => (
                    <div key={idx} className='mb-5'>
                        {category}
                    </div>
                ))}
                
                <div className="flex justify-between items-center w-full mb-4 mt-10">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Food items</h1>
                        <button className="text-xl underline font-semibold" onClick={handleSelectAllFoodItems}>
                            Select all food items
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <Buttons context="delete" />
                        <Buttons context="add_icon" />
                    </div>
                </div>
                {allFoodItems.map((foodItem, idx) => (
                    <div key={idx} className='mb-5'>
                        {foodItem}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
