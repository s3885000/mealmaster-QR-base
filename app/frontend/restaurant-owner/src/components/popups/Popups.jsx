import React, { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';
import { Upload } from '../../asset/icons/misc/index.js';

const Popups = ({visible, type, onClose}) => {
  // const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);
  const popupRef = useRef(null);

  // const handleNavigation = (path) => {
  //   navigate(path);
  // }

  useEffect(() => {
    setShowPopup(visible);
  }, [visible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  const popupHeader = {
    'alert': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Alert</h1>
      </>
    ),
    'add_table': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Table</h1>
      </>
    ),
    'edit_table': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Table</h1>
      </>
    ),
    'add_category': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Category</h1>
      </>
    ),
    'edit_category': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Category</h1>
      </>
    ),
    'add_food': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Add Food</h1>
      </>
    ),
    'edit_food': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Edit Food</h1>
      </>
    ),
    'order_details': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Order Details</h1>
      </>
    ),
    'order_details_ready': (
      <>
          <h1 className='px-3 text-2xl font-bold bg-white rounded-t-xl w-fit'>Order Details</h1>
      </>
    ),
  };

  const popupContent = {
    'alert': (
      <>
        <h1 className='text-2xl font-bold text-center'>Table 10 Has A New Order!</h1>
        <div className='flex flex-row justify-center'>
          <Buttons context='cancel' className='m-5' />
          <Buttons context='on-going-order' className='m-5' />
        </div>
      </>
    ),
    'add_table': (
      <>
        <form>
          <label class="block">
            <span class="block text-2xl font-bold">Name<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter table name" type="text" name="table_name"/>
          </label>
        </form>
        <div className='flex flex-row justify-center'>
          <Buttons context='cancel' className='m-5' />
          <Buttons context='create' className='m-5' />
        </div>
      </>
    ),
    'edit_table': (
      <>
        <form>
          <label class="block">
            <span class="block text-2xl font-bold">Name<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter table name" type="text" name="table_name"/>
          </label>
        </form>
        <div className='flex flex-row justify-center'>
          <Buttons context='cancel' className='m-5' />
          <Buttons context='update' className='m-5' />
        </div>
      </>
    ),
    'add_category': (
      <>
          <form>
          <label class="block">
            <span class="block text-2xl font-bold">Name<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter category name" type="text" name="category_name"/>
          </label>
        </form>
        <div className='flex flex-row justify-center'>
          <Buttons context='cancel' className='m-5' />
          <Buttons context='create' className='m-5' />
        </div>
      </>
    ),
    'edit_category': (
      <>
          <form>
          <label class="block">
            <span class="block text-2xl font-bold">Name<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter category name" type="text" name="category_name"/>
          </label>
        </form>
        <div className='flex flex-row justify-center'>
          <Buttons context='cancel' className='m-5' />
          <Buttons context='create' className='m-5' />
        </div>
      </>
    ),
    'add_food': (
      <>
        <form className='grid justify-items-center'>
          <label class="block">
            {/* <input  type="file" name="table_name" accept='image/*' hidden/> */}

            <span class="block text-2xl font-bold">Name<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter food name" type="text" name="food_name"/>

            <span class="block text-2xl font-bold">Description<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter description" type="text" name="description"/>

            <span class="block text-2xl font-bold">Price (VND)<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter price" type="text" name="price"/>

            <div className='outline outline-2 outline-black outline-dashed rounded-md w-fit grid justify-items-center p-4'>
              <Upload className='w-14 h-14'/>
              <p className='text-center'>Preferred size is 400px * 300px<br/>Drag 'n' drop some files here, or click to select file</p>
            </div>
          </label>
        </form>
        <div className='flex flex-row justify-center'>
          <Buttons context='cancel' className='m-5' />
          <Buttons context='create' className='m-5' />
        </div>
      </>
    ),
    'edit_food': (
      <>
          <form className='grid justify-items-center'>
          <label class="block">
            {/* <input  type="file" name="table_name" accept='image/*' hidden/> */}

            <span class="block text-2xl font-bold">Name<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter food name" type="text" name="food_name"/>

            <span class="block text-2xl font-bold">Description<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter description" type="text" name="description"/>

            <span class="block text-2xl font-bold">Price (VND)<span style={{color: 'red'}} className="span">*</span></span>
            <input class="border border-gray rounded-md placeholder-slate-400 w-full" placeholder="Enter price" type="text" name="price"/>

            <div className='outline outline-2 outline-black outline-dashed rounded-md w-fit grid justify-items-center p-4'>
              <Upload className='w-14 h-14'/>
              <p className='text-center'>Preferred size is 400px * 300px<br/>Drag 'n' drop some files here, or click to select file</p>
            </div>
          </label>
        </form>
        <div className='flex flex-row justify-center'>
          <Buttons context='cancel' className='m-5' />
          <Buttons context='update' className='m-5' />
        </div>
      </>
    ),

    'order_details': (
      <>
        <div className="order-details">
            <div className="div">
              <div className="text-wrapper">Order Id</div>
              <div className="lable-2">Timestamp</div>
              <div className="lable-3">Table</div>
              <div className="lable-4">Total</div>
            </div>
            <div className='group-2'>
              <div className="data">#ABC123</div>
              <div className="data-2">20/12/2023 12:48</div>
              <div className="data-3">15</div>
              <div className="data-4">135,000</div>
            </div>
            <div className="group-3">
              <div className="text-wrapper">Quantity</div>
              <div className="lable-2">Name</div>
              <div className="lable-3">Price</div>
              <div className="lable-4">Notes</div>
            </div>
            <div className="name">Spicy fresh crab</div>
            <div className="name-2">1</div>
            <div className="price">35,000 đ</div>
            <div className="price-2">No spice</div>
            <div className="name-3">Coconut water</div>
            <div className="name-4">3</div>
            <div className="price-3">30,000 đ</div>
            <div className="name-5">Onigiri</div>
            <div className="name-6">2</div>
            <div className="price-4">70,000 đ</div>
            <div className="price-5">No spice</div>
        </div>
        <div className='flex flex-row justify-center'>
          <Buttons context='decline' className='m-5' />
          <Buttons context='accept' className='m-5' />
        </div>

      </>
    ),

    'order_details_ready': (
      <>
        <div className="order-details">
            <div className="div">
              <div className="text-wrapper">Order Id</div>
              <div className="lable-2">Timestamp</div>
              <div className="lable-3">Table</div>
              <div className="lable-4">Total</div>
            </div>
            <div className='group-2'>
              <div className="data">#ABC123</div>
              <div className="data-2">20/12/2023 12:48</div>
              <div className="data-3">15</div>
              <div className="data-4">135,000</div>
            </div>
            <div className="group-3">
              <div className="text-wrapper">Quantity</div>
              <div className="lable-2">Name</div>
              <div className="lable-3">Price</div>
              <div className="lable-4">Notes</div>
            </div>
            <div className="name">Spicy fresh crab</div>
            <div className="name-2">1</div>
            <div className="price">35,000 đ</div>
            <div className="price-2">No spice</div>
            <div className="name-3">Coconut water</div>
            <div className="name-4">3</div>
            <div className="price-3">30,000 đ</div>
            <div className="name-5">Onigiri</div>
            <div className="name-6">2</div>
            <div className="price-4">70,000 đ</div>
            <div className="price-5">No spice</div>
        </div>
        <div className='flex flex-row justify-center'>
          <Buttons context='ready' className='m-5' />
        </div>

      </>
    ),
  };

  // if (!showPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 h-screen'>
      <div className={`animate-slide-up ${showPopup ? 'show' : ''}`}>
        <div ref={popupRef} className={`bg-gray px-6 pt-4 rounded-t-3xl w-full text-center`}>
          {popupHeader[type]}
        </div>
        <div ref={popupRef} className={`bg-white px-6 py-4 rounded-b-3xl w-full`}>
          {popupContent[type]}
        </div>
      </div>
    </div>
  );
};

export default Popups;
