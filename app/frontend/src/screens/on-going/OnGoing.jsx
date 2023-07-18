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

      <Boxes type='on-going' className='mb-2.5' onOrderReceived={handleOrderReceivedClick}/>

      <h2 className='text-black text-2xl mb-5 pt-10 px-5 text-right'>History</h2>
      
      <Boxes type='history' className='mb-2.5'/>

      <Popups type="order_completed" visible={popupVisible} onClose={closePopup} />
    </div>
  );
};

export default OnGoing;
