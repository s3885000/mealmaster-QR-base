import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { HomeNav, TableNav, MenuNav, OnGoingNav, HistoryNav, HomeNavActive, TableNavActive, MenuNavActive, OnGoingNavActive, HistoryNavActive } from '../../asset/icons/navigation/index.js';
import { MealMasterLogo } from '../../asset/images/mealmaster_logo/index.js';

const navItems = [
  { name: 'Home', Icon: HomeNav, ActiveIcon: HomeNavActive, path: '/home' },
  { name: 'Table', Icon: TableNav, ActiveIcon: TableNavActive, path: '/tables' },
  { name: 'Menu', Icon: MenuNav, ActiveIcon: MenuNavActive, path: '/menu' },
  { name: 'On-going', Icon: OnGoingNav, ActiveIcon: OnGoingNavActive, path: '/on-going' },
  { name: 'History', Icon: HistoryNav, ActiveIcon: HistoryNavActive, path: '/history' },
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex bg-white w-full h-16 p-2 lg:h-full lg:w-20 lg:flex-col lg:left-0 lg:py-4 lg:px-4">
      <div className="hidden lg:flex lg:justify-center w-full mb-4">
        <MealMasterLogo className='w-20 h-20 rounded-xl'/> 
      </div>
      <ul className="flex justify-around items-center gap-6 sm:gap-18 w-full px-6 sm:px-0 lg:flex-col lg:justify-center lg:items-center lg:gap-6 lg:px-2 lg:w-full">
        {navItems.map((item) => (
          <li key={item.name} className="text-center lg:flex lg:flex-col lg:items-center lg:w-full">
            <button 
              onClick={() => navigate(item.path)} 
              className="flex flex-col items-center justify-center w-10 sm:w-14 h-10 sm:h-14 lg:w-full lg:h-12"
            >
              {location.pathname === item.path 
                ? <item.ActiveIcon className='h-10 sm:h-14 w-10 sm:w-14 lg:w-12 lg:h-12'/> 
                : <item.Icon className='h-6 sm:h-8 w-6 sm:w-8 lg:w-6 lg:h-6'/>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;