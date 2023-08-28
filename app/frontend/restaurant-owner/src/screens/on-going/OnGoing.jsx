import React, { useState } from 'react';
import { Navigation, Header, Items } from '../../components'; 
import './ongoing.css';

const OnGoing = () => {
    const [checkedTables, setCheckedTables] = useState(new Array(8).fill(false));  

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
    
    const activeOrders = new Array(4).fill(0).map((_, idx) => renderOrder(idx, 'active'));
    const inProgressOrders = new Array(4).fill(0).map((_, idx) => renderOrder(idx, 'in_progress'));
    const allOrders = [...activeOrders, ...inProgressOrders];

    return (
        <div className="tables-screen h-screen flex overflow-x-hidden flex-col" style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
            <Header title="Tables" className="flex flex-col items-center" />
            <Navigation className="flex-none" />
            <div className="flex-auto flex flex-col items-start mt-5 px-8">
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">On-Going orders</h1>
                    </div>
                </div>
                {allOrders.map((order, idx) => (
                    <div key={idx} className='mb-5'>
                        {order}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OnGoing;
