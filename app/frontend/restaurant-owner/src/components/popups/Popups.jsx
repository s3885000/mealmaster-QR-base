import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';

const Popups = ({visible, type, onClose}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleNavigation = (path) => {
    navigate(path);
  }

  useEffect(() => {
    setShowPopup(visible);
  }, [visible]);

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

  const popupHeader = {
    'order_completed': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Order Completed!</h2>
        <p className='text-lg mb-3'>Register to save your order history</p>
        <Buttons context='rate' className='mb-5' onClick={() => handleNavigation('/on-going')}></Buttons>
        <Buttons context='order_smth' onClick={() => handleNavigation('/menu-overview')}></Buttons>
      </>
    ),
  };

  const popupContent = {
    'order_completed': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Order Completed!</h2>
        <p className='text-lg mb-3'>Register to save your order history</p>
        <Buttons context='rate' className='mb-5' onClick={() => handleNavigation('/on-going')}></Buttons>
        <Buttons context='order_smth' onClick={() => handleNavigation('/menu-overview')}></Buttons>
      </>
    ),
  };

  if (!showPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 h-screen'>
      <div className={`animate-slide-up ${showPopup ? 'show' : ''}`}>
        <div ref={popupRef} className={`bg-gray px-6 py-4 rounded-t-3xl w-full text-center`}>
          {popupHeader[type]}
        </div>
        <div ref={popupRef} className={`bg-white px-6 py-4 rounded-b-3xl w-full text-center`}>
          {popupContent[type]}
        </div>
      </div>
    </div>
  );
};

export default Popups;
