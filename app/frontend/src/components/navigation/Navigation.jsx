import React, { useState } from 'react';
import './navigation.css';
import { HomeNav, CartNav, ScanQRNav, OnGoingNav, ProfileNav,HomeNavActive, CartNavActive, ScanQRNavActive, OnGoingNavActive, ProfileNavActive} from '../../asset/icons/navigation/index.js';

const navItems = [
  { name: 'Home', Icon: HomeNav, ActiveIcon: HomeNavActive },
  { name: 'Cart', Icon: CartNav, ActiveIcon: CartNavActive },
  { name: 'Scan QR', Icon: ScanQRNav, ActiveIcon: ScanQRNavActive },
  { name: 'On-going', Icon: OnGoingNav, ActiveIcon: OnGoingNavActive },
  { name: 'Profile', Icon: ProfileNav, ActiveIcon: ProfileNavActive },
];

const Navigation = () => {
  const [active, setActive] = useState('Home');

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex bg-white w-full h-16">
      <ul className="flex justify-around items-center gap-2 sm:gap-12 w-full px-6 sm:px-0">
        {navItems.map((item) => (
          <li key={item.name} className="text-center">
            <button onClick={() => setActive(item.name)} className="flex flex-col items-center justify-center w-8 sm:w-12 h-10 sm:h-14">
            {active === item.name ? <item.ActiveIcon className='h-8 sm:h-12 w-10 sm:w-14'/> : <item.Icon className='h-4 sm:h-6 w-4 sm:w-6'/>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
