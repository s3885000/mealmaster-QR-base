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

  const popupContent = {
    // 'order_completed': (
    //   <>
    //     <h2 className='text-2xl font-bold mb-4'>Order Completed!</h2>
    //     <p className='text-lg mb-3'>Register to save your order history</p>
    //     <Buttons context='rate' className='mb-5' onClick={() => handleNavigation('/on-going')}></Buttons>
    //     <Buttons context='order_smth' onClick={() => handleNavigation('/menu-overview')}></Buttons>
    //   </>
    // ),
    'add_category': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Add Category</h2>
        <div className="group-1">
          <p className="name">
            <span className="text-wrapper">Name</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter category name</div>
          </div>
        </div>
        <Buttons context='cancel' className='mb-5' onClick={() => handleNavigation('')}></Buttons>
        <Buttons context='create' className='mb-5' onClick={() => handleNavigation('')}></Buttons>
      </>
    ),

    'edit_category': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Edit Category</h2>
        <div className="group-1">
          <p className="name">
            <span className="text-wrapper">Name</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter category name</div>
          </div>
        </div>
        <Buttons context='cancel' className='mb-5' onClick={() => handleNavigation('')}></Buttons>
        <Buttons context='create' className='mb-5' onClick={() => handleNavigation('')}></Buttons>
      </>
    ),

    'add_food': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Add Food</h2>
        <div className="group-2">
          <p className="name">
            <span className="text-wrapper">Name</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter food name</div>
          </div>
        </div>
        <div className="group-3">
          <p className="description">
            <span className="text-wrapper">Description</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter description</div>
          </div>
        </div>
        <div className="group-4">
          <p className="price">
            <span className="text-wrapper">Price</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter price</div>
          </div>
        </div>
        <div className="group-5">
          <div className="lable-2">Image</div>
        </div>
        <Buttons context='cancel' className='mb-5' onClick={() => handleNavigation('/')}></Buttons>
        <Buttons context='create' className='mb-5' onClick={() => handleNavigation('/')}></Buttons>
      </>
    ),

    'edit_food': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Edit Food</h2>
        <div className="group-2">
          <p className="name">
            <span className="text-wrapper">Name</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter food name</div>
          </div>
        </div>
        <div className="group-3">
          <p className="description">
            <span className="text-wrapper">Description</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter description</div>
          </div>
        </div>
        <div className="group-4">
          <p className="price">
            <span className="text-wrapper">Price</span>
            <span className="span">*</span>
          </p>
          <div className="input-data-wrapper">
            <div className="input-data">Enter price</div>
          </div>
        </div>
        <div className="group-5">
          <div className="lable-2">Image</div>
        </div>
        <Buttons context='cancel' className='mb-5' onClick={() => handleNavigation('/')}></Buttons>
        <Buttons context='create' className='mb-5' onClick={() => handleNavigation('/')}></Buttons>
      </>
    ),
  };

  if (!showPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 h-screen'>
      <div ref={popupRef} className={`absolute bottom-0 bg-white px-6 py-4 rounded-t-3xl w-full text-center animate-slide-up ${showPopup ? 'show' : ''}`}>
        {popupContent[type]}
      </div>
    </div>
  );
};

export default Popups;
