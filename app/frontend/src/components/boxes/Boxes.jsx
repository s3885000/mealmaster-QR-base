import React, { useState, useEffect } from 'react';
import { CollapseIcon } from '../../asset/icons/box/index.js';
import { Buttons, Progress } from '../../components';
import './boxes.css';

const Boxes = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const listForNewOrders = () => {
      const newOrder = {
      };

      setOrders(prevOrders => [...prevOrders, newOrder]);
    };

    listForNewOrders();
  }, []);

  return (
    <div>
      {orders.map((order, index) => (
        <OrderBox key={index} {...order} />
      ))}
    </div>
  );
};

const OrderBox = ({ orderId, currentStep, estimateTime, total, items }) => {
  const [orderStatus, setOrderStatus] = useState('ready');

  useEffect(() => {
    if (currentStep >= 3) {  // If all steps are completed, the order is ready
      setOrderStatus('ready');
    }
  }, [currentStep]);

  return (
    <div className="box relative w-300 h-150 bg-tertiary overflow-hidden">
      <input type="checkbox" className="absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer peer"/>

      <div className="header-content h-36 w-full pl-5 flex flex-col justify-center items space-y-1 text-xs">
        <h1 className="font-semibold ">Order: #{orderId}</h1>
        <p className="">Estimate Time: {estimateTime}</p>
        <p className="">Total: {total}</p>
        <p className="">Food item(s): {items}</p>

        <div className="flex justify-center w-full">
          <div className="progress-bar-container w-3/5">
            <Progress currentStep={currentStep} />
          </div>
        </div>
      </div>

      <div className="absolute top-5 right-3 transition-transform duration-500 rotate-0 peer-checked:rotate-180">
        <CollapseIcon className="text-white" />
      </div>

      <div className="button-container w-full flex justify-center pb-2">
        <Buttons context="order" className={`mt-2 ${orderStatus === 'ready' ? 'bg-primary' : 'bg-gray'}`}>Order Received</Buttons>
      </div>

      <div className="content bg-white overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40">
        <div className="p-4">
          content
        </div>
      </div>
    </div>
  );
};

export default Boxes;
