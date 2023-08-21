import React, { useState } from 'react';
import { Navigation, Header, Items } from '../../components'; 
import ReactPaginate from 'react-paginate';


const OnGoing = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 6;  

    const pageCount = Math.ceil(20 / PER_PAGE);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [checkedTables, setCheckedTables] = useState(new Array(20).fill(false));

    const handleCheckboxChange = (index) => {
        const newCheckedTables = [...checkedTables];
        newCheckedTables[index] = !newCheckedTables[index];
        setCheckedTables(newCheckedTables);
    };

    const renderTable = (idx) => (
        <Items 
            key={idx} 
            type="orders" 
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
                        <h1 className="text-3xl font-bold mb-2">On-Going orders</h1>
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

export default OnGoing;
