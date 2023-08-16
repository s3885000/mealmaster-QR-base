import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';

const Popups = ({visible, type, onClose}) => {
  // const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const popupRef = useRef(null);

  // const handleNavigation = (path) => {
  //   navigate(path);
  // }

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
    'alert': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Alert</h1>
      </>
    ),
    'add_table': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Table</h1>
      </>
    ),
    'edit_table': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Table</h1>
      </>
    ),
    'add_category': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Category</h1>
      </>
    ),
    'edit_category': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Category</h1>
      </>
    ),
    'add_food': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Food</h1>
      </>
    ),
    'edit_food': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Food</h1>
      </>
    ),
    'order_details': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Order Details</h1>
      </>
    ),
  };

  const popupContent = {
    'alert': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Alert</h1>
      </>
    ),
    'add_table': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Table</h1>
      </>
    ),
    'edit_table': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Table</h1>
      </>
    ),
    'add_category': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Category</h1>
      </>
    ),
    'edit_category': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Category</h1>
      </>
    ),
    'add_food': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Food</h1>
      </>
    ),
    'edit_food': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Food</h1>
      </>
    ),
    'order_details': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Order Details</h1>
      </>
    ),
  };

  // if (!showPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 h-screen'>
      <div className={`animate-slide-up ${showPopup ? 'show' : ''}`}>
        <div ref={popupRef} className={`bg-gray px-6 pt-4 rounded-t-3xl w-full text-center`}>
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
