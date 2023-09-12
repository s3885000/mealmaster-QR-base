import React, { useState } from 'react';
import './buttons.css';
import { PlusIcon, MinusIcon, CartIcon, BackIcon, EditIcon, SearchIcon } from '../../asset/icons/button/index.js';


const Buttons = ({ type, className, style, onClick, context, count, setCount = () => {}, isServeToTable, cardDetails, disabled }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Card details state change in cart
  if (context === 'cardDetails') {
    return (
      <div className='center-content'>
        <button type={type ? type : "button"} className="bg-primary2 text-primary px-2" onClick={onClick} style={style} disabled={disabled}>
          {cardDetails}
        </button>
      </div>
    );
  }

  // Button content
  const buttonContentContexts = {
    guest: 'Access as a Guest',
    apply: 'Apply',
    close: 'Close',
    logout: 'Logout',
    add_more: 'Add more Items',
    payment_options: 'Payment Options',
    scan_qr: 'Scan QR',
    continue: 'Continue',
    add_card: 'Add Card',
    popup: 'Apply',
    checkout: 'Checkout',
    add_to_cart: 'Add to Cart',
    payment:'Payment Methods',
    self_pickup: 'Self Pickup',
    serve_to_table: 'Serve to Table',
    order: 'Order Received',
    on_going: 'On Going',
    order_smth: 'Order Something Else',
    rate: 'Rate & Review',
    sign_up: 'Sign Up',
    plus: <PlusIcon />,
    minus: <MinusIcon />,
    search:  <SearchIcon />,
    cart:  <CartIcon />,
    back:  <BackIcon />,
    edit: <EditIcon />,
  };

  // Button styles
  const buttonStylesContexts = {
    guest: 'bg-primary2 text-primary',
    self_pickup: isServeToTable === false ? 'bg-primary2 text-primary' : 'bg-secondary2 text-secondary',
    serve_to_table: isServeToTable === true ? 'bg-primary2 text-primary' : 'bg-secondary2 text-secondary',
    payment: 'bg-primary2 text-primary',
    plus: 'bg-primary',
    search: 'bg-tertiary',
    sign_up: 'bg-primary2 text-primary',
    minus: 'bg-primary2',
    order_smth: 'bg-primary2 text-primary',
    cart: 'bg-primary2 text-primary',
    back: 'bg-secondary text-primary',
    default: 'bg-primary text-white',
    edit:'text-primary'
  };

  // Button size
  const buttonSizeContexts = {
    self_pickup: 'size-half',
    serve_to_table: 'size-half',
    default: 'size-default',
    plus: 'size-mini',
    minus: 'size-mini',
    cart: 'size-mini',
    search: 'size-mini',
    back: 'size-mini',
    edit: 'size-micro',
    order: 'size-order'
  };

  let buttonContent = buttonContentContexts[context] || 'Default Content';
  let buttonStyles = className ? ` ${className}` : '';
  buttonStyles += disabled ? ' bg-gray-400 opacity-50 cursor-not-allowed' : ` ${buttonStylesContexts[context] || buttonStylesContexts.default}`;
  let buttonSize = buttonSizeContexts[context] || buttonSizeContexts.default;

  buttonStyles += ` ${buttonStylesContexts[context] || buttonStylesContexts.default}`;
  buttonSize = buttonSizeContexts[context] || buttonSizeContexts.default;

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (context === 'plus') {
      setCount(count + 1);
    } else if (context === 'minus' && count > 0) {
      setCount(count - 1);
    }
    if (onClick) {
      onClick();
    }
  }

  return (
    <div className='center-content'>
      <button type={type ? type : "button"} className={`${buttonStyles} ${buttonSize}`} onClick={handleClick} style={style} disabled={disabled}>
        {buttonContent}
      </button>
    </div>
  );
};

export default Buttons;


