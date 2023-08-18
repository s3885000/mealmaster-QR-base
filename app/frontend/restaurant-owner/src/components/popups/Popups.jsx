import React, { useEffect, useState, useRef } from 'react';
import { Buttons } from '../../components';

const Popups = ({ visible, type, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleOnClose = () => {
    if (onClose) {
      onClose();
    }
    setShowPopup(false);
  }

  const PopupHeader = ({ title }) => (
    <h1 className='px-2 text-xl font-bold bg-white rounded-t-xl w-fit'>{title}</h1>
  );

  const PopupFooter = ({ buttons }) => (
    <div className='flex flex-row justify-center'>
      {buttons.map((btn, index) => (
        <Buttons key={index} context={btn.context} className='m-5' onClick={btn.onClick} />
      ))}
    </div>
  );

  const popupContent = {
    'alert': (
      <>
        <PopupHeader title="Alert" />
        <h1 className='text-2xl font-base text-center'>Table 10 Has A New Order!</h1>
        <PopupFooter buttons={[
          { context: 'cancel', onClick: handleOnClose },
          { context: 'on_going', onClick: handleOnClose }
        ]} />
      </>
    ),
    'add_table': (
      <>
        <PopupHeader title="Add Table" />
        <form>
          <label className="block">
            <span className="block text-2xl font-bold">Name</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter table name" type="text" name="table_name" />
          </label>
        </form>
        <PopupFooter buttons={[
          { context: 'cancel', onClick: handleOnClose },
          { context: 'add', onClick: handleOnClose }
        ]} />
      </>
    ),
    'edit_table': (
      <>
        <PopupHeader title="Edit Table" />
        <form>
          <label className="block">
            <span className="block text-2xl font-bold">Name</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter table name" type="text" name="table_name" />
          </label>
        </form>
        <PopupFooter buttons={[
          { context: 'cancel', onClick: handleOnClose },
          { context: 'update', onClick: handleOnClose }
        ]} />
      </>
    ),
    'add_food': (
      <>
        <PopupHeader title="Add Food" />
        <form className='grid justify-items-center'>
          <label className="block">
            <span className="block text-2xl font-bold">Name</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter food name" type="text" name="food_name" />
          </label>

          <label className='block'>
            <span className='block text-2xl font-bold'>Description</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter description" type="text" name="description" />
          </label>

          <label className='block'>
            <span className='block text-2xl font-bold'>Price (VND)</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter price" type="text" name="price" />
          </label>

          {/* <label class="block">
            <input  type="file" name="table_name" accept='image/*' hidden/>
            <div className='outline outline-2 outline-black outline-dashed rounded-md w-fit grid justify-items-center p-4'>
              <Upload className='w-14 h-14'/>
              <p className='text-center'>Preferred size is 400px * 300px<br/>Drag 'n' drop some files here, or click to select file</p>
            </div>
          </label> */}
        </form>
        <PopupFooter buttons={[
          { context: 'cancel', onClick: handleOnClose },
          { context: 'add', onClick: handleOnClose }
        ]} />
      </>
    ),
    'edit_food': (
      <>
        <PopupHeader title="Edit Food" />
        <form className='grid justify-items-center'>
          <label className="block">
            <span className="block text-2xl font-bold">Name</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter food name" type="text" name="food_name" />
          </label>

          <label className='block'>
            <span className='block text-2xl font-bold'>Description</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter description" type="text" name="description" />
          </label>

          <label className='block'>
            <span className='block text-2xl font-bold'>Price (VND)</span>
            <input className="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter price" type="text" name="price" />
          </label>

          {/* <label class="block">
            <input  type="file" name="table_name" accept='image/*' hidden/>
            <div className='outline outline-2 outline-black outline-dashed rounded-md w-fit grid justify-items-center p-4'>
              <Upload className='w-14 h-14'/>
              <p className='text-center'>Preferred size is 400px * 300px<br/>Drag 'n' drop some files here, or click to select file</p>
            </div>
          </label> */}
        </form>
        <PopupFooter buttons={[
          { context: 'cancel', onClick: handleOnClose },
          { context: 'update', onClick: handleOnClose }
        ]} />
      </>
    )
  };

  useEffect(() => {
    setShowPopup(visible);
  }, [visible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleOnClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  if (!showPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 h-screen flex items-center justify-center'>
      <div className={`animate-slide-up ${showPopup ? 'show' : ''}`}>
        <div ref={popupRef} className={`bg-gray px-6 pt-4 rounded-t-3xl w-full text-center`}>
          {PopupHeader[type]}
        </div>
        <div ref={popupRef} className={`bg-white px-6 py-4 rounded-b-3xl w-full`}>
          {popupContent[type]}
        </div>
      </div>
    </div>
  );
};

export default Popups;
