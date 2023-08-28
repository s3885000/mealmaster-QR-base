import React, { useState } from 'react';
import { Navigation, Header, Items } from '../../components'; 
import ReactPaginate from 'react-paginate';

const History = () => {
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

    const renderHistory = (idx, state) => (
        <Items 
            key={idx} 
            type="history" 
            state={state}
            isSelected={checkedTables[idx]} 
            index={idx} 
            onCheckboxChange={handleCheckboxChange}
        />
    );

    const allHistoryItems = [
        renderHistory(0, 'success'),
        renderHistory(1, 'success'),
        renderHistory(2, 'success'),
        renderHistory(3, 'failed'),
        renderHistory(4, 'failed'),
        renderHistory(5, 'failed'),
        ...new Array(14).fill(0).map((_, idx) => renderHistory(6 + idx, 'success'))
    ];

    const offset = currentPage * PER_PAGE;
    const currentHistoryItems = allHistoryItems.slice(offset, offset + PER_PAGE);

    return (
        <div className="tables-screen h-screen flex flex-col">
            <Header title="History" className="flex flex-col items-center" />
            <Navigation className="flex-none" />
            <div className="flex-grow flex flex-col items-start mt-5 px-8 overflow-x-hidden overflow-y-auto">
                <div className="flex justify-between items-center w-full mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">History</h1>
                    </div>
                </div>
                {currentHistoryItems.map((item, idx) => (
                    <div key={idx} className='mb-5'>
                        {item}
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

export default History;
