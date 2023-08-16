import React, { useState } from 'react';
import './buttons.css';
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon, FilterIcon, OnGoingIcon, SearchIcon, ViewIcon } from '../../asset/icons/button/index.js';


const Buttons = ({ type, className, style, onClick, context, count, setCount = () => {} }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Button content
  const buttonContentContexts = {
    create_account_login: 'Create an Account',
    create_account_signup: 'Create an Account',
    login: 'Login',
    already: 'Aready have an account? Login',
    email: 'Send Email',
    cancel: 'Cancel',
    on_going: 'On Going orders',
    add: 'Add',
    update: 'Update',
    details: 'Details',
    accept: 'Accept',
    decline: 'Decline',
    save:'Save',
    ready:'Ready',
    add_icon:  <AddIcon />,
    download:  <DownloadIcon />,
    delete:  <DeleteIcon />,
    edit:  <EditIcon />,
    filter:  <FilterIcon />,
    on_going_icon:  <OnGoingIcon />,
    search:  <SearchIcon />,
    view:  <ViewIcon />,
  };

  // Button styles
  const buttonStylesContexts = {
    create_account_login: 'bg-white border-2 border-gray rounded-md text-black font-bold',
    already: 'bg-white border-2 border-gray rounded-md text-black font-bold',
    login: 'bg-primary rounded-md text-white font-bold',
    create_account_signup: 'bg-primary rounded-md text-white font-bold',
    email: 'bg-primary rounded-md text-white font-bold',
    cancel: 'bg-white text-error border-2 border-error',
    decline: 'bg-white text-error border-2 border-error',
    save: 'bg-primary text-white rounded-md',
    add: 'bg-primary text-white rounded-md',
    update: 'bg-primary text-white rounded-md',
    details: 'bg-primary text-white rounded-md',
    accept: 'bg-primary text-white rounded-md',
    on_going: 'bg-primary text-white rounded-md',
    ready: 'bg-primary text-white rounded-md',
    add_icon: 'bg-primary text-white rounded-md flex flex-col items-center justify-center',
    download: 'bg-primary text-white rounded-md flex flex-col items-center justify-center',
    delete: 'bg-error text-white rounded-md flex flex-col items-center justify-center',
    on_going_icon: 'border-2 border-primary text-primary rounded-md flex items-center justify-center',
  };

  // Button size
  const buttonSizeContexts = {
    login: 'w-[350px] h-[58px] rounded-lg',
    create_account_signup: 'w-[350px] h-[58px] rounded-lg',
    email: 'w-[350px] h-[58px] rounded-lg',
    create_account_login: 'w-[350px] h-[58px] rounded-lg border-2 border-gray-400',
    already: 'w-[350px] h-[58px] rounded-lg border-2 border-gray-400',
    cancel: 'w-[150px] h-[45px] rounded-md',
    decline: 'w-[150px] h-[45px] rounded-md',
    save: 'w-[150px] h-[45px] rounded-md',
    add: 'w-[150px] h-[45px] rounded-md',
    update: 'w-[150px] h-[45px] rounded-md',
    details: 'w-[150px] h-[45px] rounded-md',
    accept: 'w-[150px] h-[45px] rounded-md',
    on_going: 'w-[150px] h-[45px] rounded-md',
    ready: 'w-[150px] h-[45px] rounded-md',
    add_icon: 'w-[50px] h-[50px] rounded-[12px]',
    download: 'w-[50px] h-[50px] rounded-[12px]',
    delete: 'w-[50px] h-[50px] rounded-[12px]',
    on_going_icon: 'w-[40px] h-[40px] rounded-[12px]',
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


