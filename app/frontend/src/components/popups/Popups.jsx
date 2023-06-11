import React from 'react'
import Buttons from '../buttons/Buttons';
import './popup.css'

const Popups = ({visible, title, description, context}) => {
  if (!visible) return null; //Remove the ! for the popup to appear

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-10'>
      <div className='bg-white px-6 py-4 rounded-t-3xl w-full text-center'>
        <h2 className='text-2xl font-bold mb-4'>This is the title</h2>
        <p className='text-lg mb-3'>By clicking ‘Apply’ you agree to delete this item from your cart.</p>
        <Buttons context='apply'></Buttons>
      </div>
    </div>
  );
}

export default Popups
