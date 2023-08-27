import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { Navigation, Header } from '../../components';

// Sample data for demonstration
const lineData = [
    {name: 'Jan', uv: 400},
    {name: 'Feb', uv: 450},
    {name: 'Mar', uv: 600},
    // ... other months
];

const barData = [
    {name: 'Product A', sales: 1000},
    {name: 'Product B', sales: 1500},
    {name: 'Product C', sales: 2500},
    // ... other products
];

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header title="Dashboard" />
      <Navigation />
      <div className="flex-grow flex flex-col mt-5 px-8 overflow-y-auto w-full">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        
        {/* Line Chart */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Monthly Usage</h2>
          <LineChart width={500} height={300} data={lineData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Product Sales</h2>
          <BarChart width={500} height={300} data={barData}>
            <Bar dataKey="sales" fill="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
