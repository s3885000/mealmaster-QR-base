import React, { useState } from 'react';
import { Navigation, Header, Items } from '../../components'; 

const OnGoing = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 12;  

    const pageCount = Math.ceil(12 / PER_PAGE);  

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [checkedTables, setCheckedTables] = useState(new Array(12).fill(false));  

    const handleCheckboxChange = (index) => {
        const newCheckedTables = [...checkedTables];
        newCheckedTables[index] = !newCheckedTables[index];
        setCheckedTables(newCheckedTables);
    };

    const renderOrder = (idx, status) => (
        <Items 
            key={idx} 
            type="orders" 
            state={status}
            isSelected={checkedTables[idx]} 
            index={idx} 
            onCheckboxChange={handleCheckboxChange}
        />
    );
    
    const activeOrders = new Array(6).fill(0).map((_, idx) => renderOrder(idx, 'active'));
    const inProgressOrders = new Array(6).fill(0).map((_, idx) => renderOrder(idx, 'in_progress'));
    const allOrders = [...activeOrders, ...inProgressOrders];
    
    const offset = currentPage * PER_PAGE;
    const currentOrders = allOrders.slice(offset, offset + PER_PAGE);

    return (
        <div className="tables-screen h-screen flex flex-col">
            <Header title="Tables" className="flex flex-col items-center" />
            <Navigation className="flex-none" />
            <div className="flex-grow flex flex-col items-start mt-5 px-8 overflow-y-auto">
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">On-Going orders</h1>
                    </div>
                </div>
                {currentOrders.map((order, idx) => (
                    <div key={idx} className='mb-5'>
                        {order}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnGoing;
