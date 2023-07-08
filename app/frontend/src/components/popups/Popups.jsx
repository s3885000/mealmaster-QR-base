import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';
import './popup.css';

const Popups = ({visible, type}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleOnGoingClick = () => {
    navigate('/on-going');
  };

  const handleMenuOverviewClick = () => {
    navigate('/menu-overview');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (!visible) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, [visible]);

  let contents;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  const orderCompleteClickContent = (
    <>
      <h2 className='text-2xl font-bold mb-4'>Order Completed!</h2>
      <p className='text-lg mb-3'>Register to save your order history</p>
      <Buttons context='rate' className='mb-5' onClick={handleOnGoingClick}></Buttons>
      <Buttons context='order_smth' onClick={handleMenuOverviewClick}></Buttons>
    </>
  );

  const thankYouClickContent = (
    <>
      <h2 className='text-2xl font-bold mb-4'>Thank you for your order</h2>
      <p className='text-lg mb-3'>Track your order in the “On Going” screen</p>
      <Buttons context='on_going' className='mb-5' onClick={handleOnGoingClick}></Buttons>
      <Buttons context='sign_up' onClick={handleSignUpClick}></Buttons>
    </>
  );

  switch (type) {
    case 'order_completed':
      contents = orderCompleteClickContent;
      break;
    case 'thank_you':
      contents = thankYouClickContent;
      break;
  }

  if (!showPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-10'>
      <div ref={popupRef} className={`bg-white px-6 py-4 rounded-t-3xl w-full text-center slide-up ${showPopup ? 'show' : ''}`}>
        {contents}
      </div>
    </div>
  );
};

export default Popups;
