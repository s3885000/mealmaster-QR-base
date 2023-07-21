import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollapseIcon } from '../../asset/icons/box/index.js';
import { HaidilaoLogoMini } from '../../asset/images/restaurant_info/haidilao/index.js';
import { Buttons, Progress, Popups, Items } from '../../components';
import './boxes.css';

const Boxes = ({ type }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  useEffect(() => {
    const listForNewOrders = () => {
      const newOrder = {};

      setOrders(prevOrders => [...prevOrders, newOrder]);
    };

    listForNewOrders();
  }, []);

  const typeComponents = {
    'on-going': orders.map((order) => (
      <OrderBox key={order.id} {...order} togglePopup={togglePopup} onOrderReceived={togglePopup} type="on-going" />
    )),
    'history': orders.map((order) => (
      <OrderBox key={order.id} {...order} type="history" />
    ))
  };

  return (
    <div>
      {typeComponents[type]}
      {showPopup && <Popups visible={showPopup} closePopup={closePopup} type="order_completed" />}
    </div>
  );
};

const OrderBox = ({onOrderReceived, type, ...props}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); 

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOrderReceivedClick = () => {
    setCurrentStep(currentStep + 1); 
    onOrderReceived();
  };

  return (
    <div className={`box relative w-full max-w-[370px] mx-auto flex flex-col bg-tertiary overflow-hidden mb-4 rounded-2xl ${type === 'history' ? 'bg-gray' : ''}`}>
      <div className="header-content h-36 w-full flex flex-col justify-between items-center space-y-1 text-xs whitespace-nowrap overflow-hidden">
        {type === 'history' && (
          <div className="flex flex-col items-center justify-center mt-2">
            <div className="flex items-center justify-center">
              <HaidilaoLogoMini className="w-10 h-10 rounded-full" />
              <h1 className="ml-2 text-lg font-bold">Haidilao - Đồng Khởi</h1>
            </div>
            <p className="text-primary text-lg">Completed!</p>
          </div>
        )}
        
        <div className="flex justify-between w-full items-center mt-1">
          <div>
            <h1 className="font-semibold ">Order: #{props.orderId}</h1>
            <p className="">Estimate Time: {props.estimateTime}</p>
            <p className="">Total: {props.total}</p>
          </div>

          <button onClick={toggleExpanded} className="ml-60 transition-transform duration-500" style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)'}}>
            <CollapseIcon className="text-white" />
          </button>
        </div>

        {type !== 'history' && (
          <div className="flex justify-center w-full">
            <div className="progress-bar-container w-full">
              <Progress currentStep= '2' />
            </div>
          </div>
        )}
      </div>
      
      {type === 'on-going' && (
        <div className="button-container flex justify-center pb-2">
          <Buttons style={{width: '228px'}} context="order" onClick={handleOrderReceivedClick} className={`mt-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray'}`}>Order Received</Buttons>
        </div>
      )}
      
      <div className={`content bg-white transition-all duration-500 overflow-auto ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-4">
          <Items type='food_item_on_going'></Items>
          <Items type='food_item_on_going'></Items>
          <Items type='food_item_on_going'></Items>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
