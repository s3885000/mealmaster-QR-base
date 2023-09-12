import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Buttons, Boxes, Popups } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from '../../services/api';
import { fetchOnGoingOrders } from '../../redux/actions/onGoingActions';

const OnGoing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [popupVisible, setPopupVisible] = useState(false);
  const ongoingOrders = useSelector(state => state.onGoing.onGoingOrders);
  const ongoingOrdersEmpty = !ongoingOrders || ongoingOrders.length === 0;

  const userDetails = decodeToken();
  const userId = userDetails?.userId;

  useEffect(() => {
    if (userId) {
      dispatch(fetchOnGoingOrders(userId));
    }
  }, [userId, dispatch, location]);

  const handleOnGoingClick = () => {
    navigate('/menu-overview');
  };

  const handleOrderReceivedClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleStepCompleted = () => {
    setPopupVisible(true); 
  };

  const handleScanQRClick = () => {
    navigate('/scanqr');
  };

  return (
    <div>
      <div className='flex items-center justify-between w-full mb-5 px-5 pt-20'>
        <Buttons context='back' onClick={handleOnGoingClick}/>
        <h1 className='text-black text-2xl'>On Going</h1>
      </div>

      {ongoingOrdersEmpty ? (
        <div className="flex flex-col items-center justify-center p-10 mt-10">
          <h2>There is no current order</h2>
          <Buttons context="scan_qr" onClick={handleScanQRClick} className="mt-4"></Buttons>
        </div>
      ) : (
        <Boxes type='on-going' className='mb-2.5' onOrderReceived={handleOrderReceivedClick} onStepCompleted={handleStepCompleted}/>
      )}

      <h2 className='text-black text-2xl mb-5 pt-10 px-5 text-right'>History</h2>
      
      <Boxes type='history' className='mb-2.5'/>

      <Popups type="order_completed" visible={popupVisible} onClose={closePopup} />
    </div>
  );
};

export default OnGoing;
