import React from 'react';
import './header.css';
import { Buttons, Search } from '../../components';
import { ProfilePic } from '../../asset/images/user_profile/index.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='header-fixed-height flex justify-between pt-5 items-center px-8 sm:px-6 sm:py-4'>
      <div className="flex-grow pl-1 sm:pl-0 pr-2 sm:pr-4"> 
        <Search />
      </div>
      <div className='flex items-center space-x-2 sm:pr-0'> 
        <Buttons context="on_going_icon" />
        <div 
          className='w-10 h-10 sm:w-10 sm:h-10 bg-primary rounded-xl profile-pic-hover'
          onClick={() => navigate("/profile")}
        >
          <ProfilePic className='w-full h-full rounded-xl' />
        </div>
      </div>
    </div>
  );
};

export default Header;
