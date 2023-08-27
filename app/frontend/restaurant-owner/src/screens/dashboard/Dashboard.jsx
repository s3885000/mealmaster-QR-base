import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
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

const areaData = [
    {name: 'Jan', uv: 400, pv: 240},
    {name: 'Feb', uv: 450, pv: 280},
    {name: 'Mar', uv: 600, pv: 450},
    // ... other months
];

const pieData = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 300},
    {name: 'Group D', value: 200},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header title="Dashboard" />
      <Navigation />
      <div className="flex-grow flex flex-col mt-5 px-8 overflow-y-auto w-full">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>

        <div className="grid grid-cols-2 gap-8 mt-8">
        
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

        {/* Area Chart */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Yearly Comparison</h2>
          <AreaChart width={500} height={300} data={areaData}>
            <Area type="monotone" dataKey="uv" fill="#8884d8" stroke="#8884d8" />
            <Area type="monotone" dataKey="pv" fill="#82ca9d" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </div>

        {/* Pie Chart */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">User Groups</h2>
          <PieChart width={500} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
