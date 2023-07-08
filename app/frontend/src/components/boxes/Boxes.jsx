import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollapseIcon } from '../../asset/icons/box/index.js';
import { Buttons, Progress, Popups, Items } from '../../components';
import './boxes.css';

const Boxes = ({onOrderReceived}) => {
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
      const newOrder = {
      };

      setOrders(prevOrders => [...prevOrders, newOrder]);
    };

    listForNewOrders();
  }, []);

  return (
    <div>
      {orders.map((order, index) => (
        <OrderBox key={index} {...order} togglePopup={togglePopup} onOrderReceived={togglePopup} />
      ))}
      {showPopup && <Popups visible={showPopup} closePopup={closePopup} type="order_completed" />}
    </div>
  );
};

const OrderBox = ({onOrderReceived, ...props}) => {
  const [orderStatus, setOrderStatus] = useState('ready');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (props.currentStep >= 3) {
      setOrderStatus('ready');
    }
  }, [props.currentStep]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOrderReceivedClick = () => {
    onOrderReceived();
  };

  return (
    <div className="box relative w-300 flex flex-col bg-tertiary overflow-hidden">
      <div className="header-content h-36 w-full pl-5 flex flex-col justify-between items-start space-y-1 text-xs">
        <div className="flex justify-between w-full items-center">
          <div>
            <h1 className="font-semibold ">Order: #{props.orderId}</h1>
            <p className="">Estimate Time: {props.estimateTime}</p>
            <p className="">Total: {props.total}</p>
          </div>

          <button onClick={toggleExpanded} className="ml-60 transition-transform duration-500" style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)'}}>
            <CollapseIcon className="text-white" />
          </button>
        </div>

        <div className="flex justify-center w-full">
          <div className="progress-bar-container w-3/5">
            <Progress currentStep={props.currentStep} />
          </div>
        </div>
      </div>

      <div className="button-container py-5 w-full flex justify-center pb-2">
        <Buttons context="order" onClick={handleOrderReceivedClick} className={`mt-2 ${orderStatus === 'ready' ? 'bg-primary' : 'bg-gray'}`}>Order Received</Buttons>
      </div>

      <div className={`content bg-white transition-all duration-500 overflow-auto ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-4">
          <Items type='food_item_on_going'></Items>
          <Items type='food_item_on_going'></Items>
          <Items type='food_item_on_going'></Items>
          <Items type='food_item_on_going'></Items>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
