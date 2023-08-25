import React from 'react';
import { Navigation, Header } from '../../components'; 
import './dashboard.css';

const Dashboard = () => {
    return (
        <div className="tables-screen h-screen max-width-content">
            <Header title="Tables" />
            <Navigation />
            <div className="mt-5 px-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            </div>
        </div>
    );
};

export default Dashboard;
