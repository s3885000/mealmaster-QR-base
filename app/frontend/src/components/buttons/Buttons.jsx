import React, { useState } from 'react';
import './buttons.css';
import { PlusIcon, MinusIcon, CartIcon, BackIcon } from '../../asset/icons/button/index.js';


const Buttons = ({ type, className, style, onClick, context, count, setCount = () => {} }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Context for button content
  const buttonContentContexts = {
    guest: 'Access as a Guest',
    apply: 'Apply',
    continue: 'Continue',
    add_card: 'Add Card',
    scan_me: 'Scan Me',
    popup: 'Apply',
    checkout: 'Checkout',
    add_to_cart: 'Add to Cart',
    payment:'Payment Methods',
    self_pickup: 'Self Pickup',
    serve_to_table: 'Serve to Table',
    plus: <PlusIcon />,
    minus: <MinusIcon />,
    cart:  <CartIcon />,
    back:  <BackIcon />
  };

  // Context for button styles
  const buttonStylesContexts = {
    guest: 'bg-primary2 text-primary',
    self_pickup: isClicked ? 'bg-primary2 text-primary' : 'bg-secondary2 text-secondary',
    serve_to_table: isClicked ? 'bg-primary2 text-primary' : 'bg-secondary2 text-secondary',
    payment: 'bg-secondary2 text-secondary',
    plus: 'bg-primary',
    minus: 'bg-primary2',
    cart: 'bg-primary2 text-primary',
    back: 'bg-secondary text-primary',
    default: 'bg-primary text-white'
  };

  // Context for button size
  const buttonSizeContexts = {
    self_pickup: 'size-half',
    serve_to_table: 'size-half',
    default: 'size-default',
    plus: 'size-mini',
    minus: 'size-mini',
    cart: 'size-mini',
    back: 'size-mini'
  };

  let buttonContent = buttonContentContexts[context] || 'Default Content';
  let buttonStyles = className ? ` ${className}` : '';
  let buttonSize = '';

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
      <button type={type ? type : "button"} className={`${buttonStyles} ${buttonSize}`} onClick={handleClick} style={style}>
        {buttonContent}
      </button>
    </div>
  );
};

export default Buttons;


