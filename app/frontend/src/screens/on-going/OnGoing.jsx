import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons, Boxes, Popups } from '../../components';

const OnGoing = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleOnGoingClick = () => {
    navigate('/menu-overview');
  };

  const handleOrderReceivedClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <div className='flex items-center justify-between w-full mb-5 px-5 pt-20'>
        <Buttons context='back' onClick={handleOnGoingClick}/>
        <h1 className='text-black text-2xl'>On Going</h1>
      </div>

      <Boxes className='mb-2.5' onOrderReceived={handleOrderReceivedClick}/>

      <Popups type="order_completed" visible={popupVisible} onClose={closePopup} />
    </div>
  );
};

export default OnGoing;
