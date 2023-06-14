import React from 'react';
import { Buttons, Information } from '../../components';
import './menuoverview.css';

const MenuOverview = () => {
  return (
    <div className="menu-overview">
      <Information type="table_number" />
      <Information type="address" />
    </div>
  );
};

export default MenuOverview;
