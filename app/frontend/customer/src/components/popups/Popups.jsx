import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';
import { decodeToken } from '../../services/api';
import { fetchOnGoingOrders } from '../../redux/actions/onGoingActions';
import { useDispatch } from 'react-redux';

const Popups = ({visible, type, onClose, onApply, currentNotes, onUpdateNotes}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(visible);
  const popupRef = useRef(null);
  const [localNotes, setLocalNotes] = useState(currentNotes);


  const handleNavigateToOngoing = () => {
    const decodedToken = decodeToken();
    const userId = decodedToken?.sub;
    if (userId) {
      dispatch(fetchOnGoingOrders(userId))
      .then(() => {
        handleNavigation('/on-going');
      })
      .catch(error => {
        console.error("Error fetching ongoing orders:", error);
      }) 
    }
  }

  useEffect(() => {
    setShowPopup(visible);
  }, [visible]);

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

  const defaultContent = (
    <>
      <h2 className='text-2xl font-bold mb-4'>Default Popup Content</h2>
      <p className='text-lg mb-3'>This is the default content for the popup.</p>
    </>
  );
  

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
        <Buttons context='on_going' className='mb-5' onClick={handleNavigateToOngoing}></Buttons>
      </>
    ),
    'add_card_successful': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Card Added!</h2>
        <p className='text-lg mb-3'>Select your newly added card in Payment Options</p>
        <Buttons context='payment_options' className='mb-5' onClick={() => handleNavigation('/payment-options')}></Buttons>
      </>
    ),
    'notes': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Edit notes</h2>
        <div className='mb-3.75'>
        <textarea
          className='px-2 text-l bg-gray opacity-50 text-black font-medium rounded-lg mb-5 w-full h-24 resize-none'
          name='foodItemNotes'
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          placeholder='Enter your notes here'
        />
        </div>
        <Buttons context='apply' className='mb-5' onClick={() => {
          if (onUpdateNotes) {
            onUpdateNotes(localNotes);
          }
          onClose();  
        }} />
      </>
    ),
    'cart_empty': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Cart is Empty</h2>
        <p className='text-lg mb-3'>Your cart is currently empty, please add more item to view your cart.</p>
        <Buttons context='add_more' className='mb-5' />
      </>
    ),
    'delete_item': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Delete this Item</h2>
        <p className='text-lg mb-3'>By clicking ‘Apply’ you agree to delete this item from your cart.</p>
        <Buttons context='apply' className='mb-5' />
      </>
    ),
    'food_ready': (
      <>
        <h2 className='text-2xl font-bold mb-4'>Food is Ready</h2>
        <p className='text-lg mb-3'>Your food is ready to pick up at counter! Press Order Received when you’re done.</p>
        <Buttons context='close' className='mb-5' onClick={onClose}></Buttons>
      </>
    ),
  };

  if (!showPopup) return null;

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50'>
      <div ref={popupRef} className={`absolute bottom-0 bg-white px-6 py-4 rounded-t-3xl w-full text-center animate-slide-up ${showPopup ? 'show' : ''}`}>
        {popupContent[type] || defaultContent}
      </div>
    </div>
  );
};

export default Popups;
