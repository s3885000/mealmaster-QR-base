import React from 'react'
import { Buttons } from '../../components';
import './popup.css'

const Popups = ({visible, title, description, context, type, customStyles}) => {
  if (!visible) return null;

  let contents;

  switch (type) {
    default:
      contents = (
        <>
          <h2 className='text-2xl font-bold mb-4'>{title}</h2>
          <p className='text-lg mb-3'>{description}</p>
          <Buttons context={context}></Buttons>
        </>
      );
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
      <div className={`bg-white px-6 py-4 rounded-t-3xl w-full text-center ${customStyles}`}>
        {contents}
      </div>
    </div>
  );
}

export default Popups;
