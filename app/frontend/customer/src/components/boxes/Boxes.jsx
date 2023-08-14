import React, { useState, useEffect } from 'react';
import { CollapseIcon } from '../../asset/icons/box/index.js';
import { HaidilaoLogoMini } from '../../asset/images/restaurant_info/haidilao/logo/index.js';
import { Buttons, Progress, Popups, Items } from '../../components';
import './boxes.css';

const OngoingOrderBox = ({ orderId, estimateTime, total, onOrderReceived }) => {
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
    <OrderBox
      orderId={orderId}
      estimateTime={estimateTime}
      total={total}
      type="on-going"
      isExpanded={isExpanded}
      toggleExpanded={toggleExpanded}
      handleOrderReceivedClick={handleOrderReceivedClick}
      currentStep={currentStep}
    />
  );
};

const HistoryOrderBox = ({ orderId, date, total }) => {
  return (
    <OrderBox
      orderId={orderId}
      date={date}
      total={total}
      type="history"
    />
  );
};

const OrderBox = ({ orderId, estimateTime, total, date, type, isExpanded, toggleExpanded, handleOrderReceivedClick, currentStep }) => {
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
        
        <div className="flex justify-between w-full items-center mt-1 pl-3">
          <div>
            <h1 className="font-semibold ">Order: #{orderId}</h1>
            {type === 'on-going' ? (
              <p className="">Estimate Time: {estimateTime}</p>
            ) : (
              <p className="">Date: {date}</p>
            )}
            <p className="">Total: {total}</p>
          </div>

          <button onClick={toggleExpanded} className="ml-60 transition-transform duration-500" style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)'}}>
            <CollapseIcon className="text-white" />
          </button>
        </div>

        {type !== 'history' && (
          <div className="flex justify-center w-full">
            <div className="progress-bar-container w-full">
              <Progress currentStep='2' /> {/* Will need to replace the '2' with {currentStep} when implementing API */}
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

const Boxes = ({ type }) => {
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
      <OngoingOrderBox key={order.id} {...order} onOrderReceived={togglePopup} />
    )),
    'history': orders.map((order) => (
      <HistoryOrderBox key={order.id} {...order} />
    ))
  };

  return (
    <div>
      {typeComponents[type]}
      {showPopup && <Popups visible={showPopup} closePopup={closePopup} type="order_completed" />}
    </div>
  );
};

export default Boxes;
