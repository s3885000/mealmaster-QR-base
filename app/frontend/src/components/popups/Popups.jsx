import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';

const Popups = ({visible, type}) => {
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

  const popupContent = {
    'order_completed': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Order Completed!</h2>
        <p className='text-lg mb-3'>Register to save your order history</p>
        <Buttons context='rate' className='mb-5' onClick={() => handleNavigation('/on-going')}></Buttons>
        <Buttons context='order_smth' onClick={() => handleNavigation('/menu-overview')}></Buttons>
      </>
    ),
    'thank_you': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Thank you for your order</h2>
        <p className='text-lg mb-3'>Track your order in the “On Going” screen</p>
        <Buttons context='on_going' className='mb-5' onClick={() => handleNavigation('/on-going')}></Buttons>
      </>
    ),
    'notes': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Edit notes</h2>
        <div className='mb-3.75'>
          <textarea
            className='px-2 text-l bg-gray opacity-50 text-black font-medium rounded-lg mb-5 w-full h-24 resize-none'
            name='foodItemNotes'
            placeholder='Enter your notes here'
          />
        </div>
        <Buttons context='apply' className='mb-5' />
      </>
    ),
  };

  if (!showPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50'>
      <div ref={popupRef} className={`bg-white px-6 py-4 rounded-t-3xl w-full text-center animate-slide-up ${showPopup ? 'show' : ''}`}>
        {popupContent[type]}
      </div>
    </div>
  );
};

export default Popups;
