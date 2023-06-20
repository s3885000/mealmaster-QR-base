import React from 'react';
import { HaidilaoLogoMini } from '../../asset/images/restaurant_info/haidilao/index.js';
import { StarIcon, TimeIcon } from '../../asset/icons/box/index.js';

const Information = ({ type }) => {
  const content = {
    table_number: 'Table No.15',
    address: 'L3 Vincom Center, 72 Lê Thánh Tôn, P. Bến Nghé, Quận 1, TP. HCM.',
  };

  return (
    <div className="w-120 h-auto border border-placeholders mx-auto justify-center items-center">
      {/* Top section */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <HaidilaoLogoMini className="w-16 h-16 rounded-full" />
          <h1 className="ml-2 text-xl font-bold">Haidilao - Đồng Khởi</h1>
        </div>
        <div className="flex items-center justify-center text-xl mt-2">
          <StarIcon className="w-5 h-5" />
          <p className="ml-1 text-primary">4.9 (284)</p>
          <TimeIcon className="w-5 h-5 ml-4" />
          <p className="ml-1 text-primary">15-25 mins</p>
        </div>
      </div>
      {/* Section divider */}
      <hr className="border border-placeholders w-4/5 mx-auto" />
      {/* Bottom section */}
      <div className="p-2 text-center">
        <p className="mb-2 text-l">{content[type]}</p>
      </div>
    </div>
  );
};

export default Information;
