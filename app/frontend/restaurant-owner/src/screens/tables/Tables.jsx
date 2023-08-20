import React, { useState } from 'react';
import { Buttons, Navigation, Header, Items } from '../../components'; 
import ReactPaginate from 'react-paginate';
import './tables.css';

const Tables = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 6;  

    const pageCount = Math.ceil(20 / PER_PAGE);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // State to manage the checkbox selection
    const [selectAll, setSelectAll] = useState(false);
    const [checkedTables, setCheckedTables] = useState(new Array(20).fill(false));

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        
        // Update all checkboxes in the checkedTables array
        const newCheckedTables = new Array(20).fill(newSelectAll);
        setCheckedTables(newCheckedTables);
    };

    const handleCheckboxChange = (index) => {
        const newCheckedTables = [...checkedTables];
        newCheckedTables[index] = !newCheckedTables[index];
        setCheckedTables(newCheckedTables);
    };

    // Mock data. We're using a function instead of direct JSX to pass the isSelected prop.
    const renderTable = (idx) => (
        <Items 
            key={idx} 
            type="tables" 
            isSelected={checkedTables[idx]} 
            index={idx} 
            onCheckboxChange={handleCheckboxChange}
        />
    );
    const allTables = new Array(20).fill(0).map((_, idx) => renderTable(idx));
    const offset = currentPage * PER_PAGE;
    const currentTables = allTables.slice(offset, offset + PER_PAGE);

    return (
        <div className="tables-screen h-screen flex flex-col">
            <Header title="Tables" className="flex flex-col items-center" />
            <Navigation className="flex-none" />
            <div className="flex-grow flex flex-col items-start mt-5 px-8 overflow-y-auto">
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Tables</h1>
                        <button className="text-xl underline font-semibold" onClick={handleSelectAll}>
                            Select all tables
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <Buttons context="delete" />
                        <Buttons context="add_icon" />
                    </div>
                </div>
                {currentTables.map((table, idx) => (
                    <div key={idx} className='mb-5'>
                        {table}
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center py-4 w-full">
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"} 
                    pageLinkClassName={"pagination__link"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
            </div>
        </div>
    );
};

export default Tables;
