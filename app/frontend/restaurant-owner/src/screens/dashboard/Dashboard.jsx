import React, { useState } from 'react';
import { Navigation, Header, Items } from '../../components'; 
import ReactPaginate from 'react-paginate';


const Dashboard = () => {

    return (
        <div className="tables-screen h-screen flex flex-col">
            <Header title="Tables" className="flex flex-col items-center" />
            <Navigation></Navigation>

        </div>
    );
};

export default Dashboard;
