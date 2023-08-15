import React from 'react'
import './header.css'
import { Buttons } from '../../components'
import { ProfilePic } from '../../asset/images/user_profile/index.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <div className='flex justify-between pt-20 items-center px-4 py-2 sm:px-6 sm:py-4'>
      <div className='flex items-center space-x-4 sm:space-x-6'>
        <div className='w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-xl'>
          <ProfilePic className='w-full h-full rounded-xl'/>
        </div>
        {/* <div className='flex flex-col'>
          <p className='text-sm sm:text-base'>History</p>
          <p className='text-sm sm:text-base'>Menu</p>
          <p className='text-sm sm:text-base'>QR Code</p>
        </div> */}
      </div>
      <div>
        <Buttons context="order" className='w-8 h-8 sm:w-12 sm:h-12' onClick={handleOrderClick}></Buttons>
      </div>
    </div>
  )
}

export default Header;
