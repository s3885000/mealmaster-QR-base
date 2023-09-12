import React, { useState, useEffect } from 'react';
import { CollapseIcon } from '../../asset/icons/box/index.js';
import { Buttons, Progress, Popups, Items } from '../../components';
import { fetchOrders } from '../../redux/actions/orderActions.js';
import { fetchOnGoingOrders, markOrderAsCompleted, updateOrderStatusInStore } from '../../redux/actions/onGoingActions.js';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './boxes.css';
import { decodeToken } from '../../services/api.js';
import socket from '../../services/socket.js';

const ORDER_CONFIRMED = "ORDER_CONFIRMED";
const ORDER_IN_PROGRESS = "ORDER_IN_PROGRESS";
const ORDER_READY = "ORDER_READY";
const ORDER_PENDING_ACCEPTANCE = "ORDER_PENDING_ACCEPTANCE";

const areEqual = (prevProps, nextProps) => {
  return prevProps.orderId === nextProps.orderId && prevProps.orderStatus === nextProps.orderStatus;
};

const OngoingOrderBox = React.memo(({ orderId, unique_id, estimateTime, total_price, onOrderReceived, orderStatus, orderItems }) => {
  const dispatch = useDispatch();

  const ongoingOrders = useSelector(state => state.onGoing.onGoingOrders, shallowEqual);
  const currentOrder = ongoingOrders.find(order => order.id === orderId || order.unique_id === orderId);
  const currentOrderStatus = currentOrder?.orderStatus && currentOrder.orderStatus.length ? currentOrder.orderStatus[currentOrder.orderStatus.length - 1].status : null;

  // Convert order status to step number
  const orderStatusToStep = (status) => {
    console.log("Mapping status to step for status:", status);
    switch (status) {
      case ORDER_CONFIRMED:
        return 1;
      case ORDER_IN_PROGRESS:
        return 2;
      case ORDER_READY:
        return 3;
      case ORDER_PENDING_ACCEPTANCE:
        return 0
      default:
        console.warn("Unexpected order status:", status)
        return 0;
    }
  };

  const isOrderReady = currentOrderStatus === ORDER_READY;

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(orderStatusToStep(orderStatus));

  const userDetails = decodeToken();
  const userId = userDetails?.userId;
  
  useEffect(() => {
  }, [orderStatus]);

  useEffect(() => {
    const newStep = orderStatusToStep(currentOrderStatus);
    if (newStep > currentStep) {  // Only update if the new step is greater
      setCurrentStep(prevStep => (newStep > prevStep ? newStep : prevStep));
    }
  }, [currentOrderStatus]);


  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOrderReceivedClick = () => {
    dispatch(markOrderAsCompleted(orderId, userId));
  };

  useEffect(() => {
    if(currentOrderStatus === ORDER_READY) {
      onOrderReceived();
    }
  }, [currentOrderStatus, onOrderReceived]);

  return (
    <OrderBox
      orderId={unique_id}
      estimateTime={estimateTime}
      total={total_price}
      type="on-going"
      isExpanded={isExpanded}
      toggleExpanded={toggleExpanded}
      handleOrderReceivedClick={handleOrderReceivedClick}
      currentStep={currentStep}
      orderItems={orderItems}
      isOrderReady={isOrderReady}
    />
  );
}, areEqual);

const HistoryOrderBox = React.memo(({ orderId, date, total, restaurant, orderItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // console.log("HistoryOrderBox props:", { orderId, date, total, restaurant });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <OrderBox
      orderId={orderId}
      date={new Date(date).toLocaleDateString()}
      total={total}
      type="history"
      restaurantLogo={restaurant.logo}
      restaurantName={restaurant.name}
      isExpanded={isExpanded}
      toggleExpanded={toggleExpanded}
      orderItems={orderItems}
    />
  );
}, areEqual);


const OrderBox = ({ orderId, estimateTime, total, date, type, isExpanded, toggleExpanded, handleOrderReceivedClick, currentStep, restaurantLogo, restaurantName, orderItems, isOrderReady }) => {
  return (
    <div className={`box relative w-full max-w-[375px] mx-auto flex flex-col bg-tertiary overflow-hidden mb-4 rounded-2xl ${type === 'history' ? 'bg-gray' : ''}`}>
      <div className="header-content w-full flex flex-col justify-between items-center text-xs whitespace-nowrap overflow-hidde">
        
      <div className="flex justify-between items-center w-full">
          <div className="flex flex-col items-start space-y-1">
            {type === 'history' && (
              <div className="flex items-center mt-4 ml-4">
                <img src={restaurantLogo} alt={restaurantName} className="w-8 h-8 rounded-full" />
                <h1 className="ml-2 text-lg font-bold">{restaurantName}</h1>
              </div>
            )}
              <div className='ml-4 mt-4'>
                <h1 className="font-semibold ">Order: #{orderId}</h1>
                {type === 'on-going' ? (
                  <p className="">Estimate Time: N/A{estimateTime}</p>
                ) : (
                  <p className="">Date: {date}</p>
                )}
                <p className="mb-4">Total: {total}</p>
              </div>
          </div>
          <button onClick={toggleExpanded} className="transition-transform duration-500 absolute left-40" style={{transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)'}}>
            <CollapseIcon className="text-white" />
          </button>
        </div>

        {type === 'on-going' && (
          <div className="flex justify-center items-center w-full -mt-5">
            <div className="progress-bar-container w-full">
              <Progress currentStep={currentStep} />
            </div>
          </div>
        )}
      </div>
      
      {type === 'on-going' && (
        <div className="button-container flex justify-center pb-4">
          <Buttons style={{width: '228px'}} context="order" onClick={handleOrderReceivedClick} className={`mt-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray'}`} disabled={!isOrderReady}>Order Received</Buttons>
        </div>
      )}
      
      <div className={`content bg-white transition-all duration-500 overflow-auto ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="p-4">
          <Items type={type === 'on-going' ? 'food_item_on_going' : 'food_item_history'} orderItems={orderItems}></Items>
        </div>
      </div>
    </div>
  );
};


const Boxes = ({ type }) => {
  const dispatch = useDispatch();
  const ongoingOrders = useSelector(state => state.onGoing.onGoingOrders);
  const historyOrders = useSelector(state => state.order.orders);

  const userDetails = decodeToken();
  const userId = userDetails?.userId;

  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
  }, [ongoingOrders, historyOrders]);

  // For joining the room
  useEffect(() => {
    if (userId) {
      socket.emit('joinRoom', { roomId: userId });
    }
  }, [userId]);

  // For fetching orders
  useEffect(() => {
    if (userId) {
      if (type === 'history') {
        dispatch(fetchOrders(userId));
      } else if (type === 'on-going') {
        dispatch(fetchOnGoingOrders(userId));
      }
    } else {
      console.error("Unable to fetch userId from token.");
    }
  }, [type, dispatch, userId]);

  // Listen for real-time updates via WebSocket
  useEffect(() => {
    const handleOrderStatusUpdate = (data) => {
      if (data.orderId && data.status) {
        dispatch(updateOrderStatusInStore(Number(data.orderId), data.status));
      } else {
          console.log("Conditions not met to dispatch updateOrderStatusInStore.");
      }
    };
    
    socket.on('orderStatusUpdate', handleOrderStatusUpdate);
  
    return () => {
      socket.off('orderStatusUpdate', handleOrderStatusUpdate);
    };
  }, [dispatch]); 

  const typeComponents = {
    'on-going': ongoingOrders && ongoingOrders.map((order) => (
      <OngoingOrderBox 
        key={order.orderId || order.unique_id}
        orderId={order.id || "defaultOrderId"} 
        unique_id={order.unique_id} 
        estimateTime={order.estimateTime}
        total_price={order.total_price}
        orderStatus={order.orderStatus && order.orderStatus[0] ? order.orderStatus[0].status : null}
        onOrderReceived={togglePopup}
        orderItems={order.orderItems}
      />
    )),
    'history': historyOrders && historyOrders.map((order) => (
      <HistoryOrderBox 
        key={order.id} 
        orderId={order.unique_id} 
        date={order.create_at} 
        total={order.total_price} 
        restaurant={order.restaurant}
        orderItems={order.orderItems}
      />
    ))
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {typeComponents[type]}
      {showPopup && <Popups visible={showPopup} closePopup={closePopup} type="order_completed" />}
    </div>
  );
};

export default Boxes;