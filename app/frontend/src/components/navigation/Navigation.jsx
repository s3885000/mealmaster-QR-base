import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { HomeNav, CartNav, ScanQRNav, OnGoingNav, ProfileNav, HomeNavActive, CartNavActive, ScanQRNavActive, OnGoingNavActive, ProfileNavActive } from '../../asset/icons/navigation/index.js';

const navItems = [
  { name: 'Home', Icon: HomeNav, ActiveIcon: HomeNavActive, path:'/home' },
  { name: 'Cart', Icon: CartNav, ActiveIcon: CartNavActive, path:'/cart' },
  { name: 'Scan QR', Icon: ScanQRNav, ActiveIcon: ScanQRNavActive, path:'/scanqr' },
  { name: 'On-going', Icon: OnGoingNav, ActiveIcon: OnGoingNavActive, path:'/on-going' },
  { name: 'Profile', Icon: ProfileNav, ActiveIcon: ProfileNavActive, path:'/profile' },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex bg-white w-full h-16">
      <ul className="flex justify-around items-center gap-6 sm:gap-18 w-full px-6 sm:px-0">
        {navItems.map((item) => (
          <li key={item.name} className="text-center">
            <button 
              onClick={() => navigate(item.path)} 
              className="flex flex-col items-center justify-center w-10 sm:w-14 h-10 sm:h-14"
            >
              {location.pathname === item.path ? <item.ActiveIcon className='h-10 sm:h-14 w-10 sm:w-14'/> : <item.Icon className='h-6 sm:h-8 w-6 sm:w-8'/>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
