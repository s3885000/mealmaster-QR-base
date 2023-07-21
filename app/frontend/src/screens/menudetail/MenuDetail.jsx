import React, { useState } from 'react';
import { Buttons } from '../../components';
import { useNavigate } from 'react-router-dom';
import { Food_1, Food_2 } from '../../asset/images/restaurant_info/haidilao/food/index.js';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MenuDetail = () => {
  const [foodItemNotes, setFoodItemNotes] = useState('');
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFoodItemNotes(event.target.value);
  };

  const handleBackClick = () => {
    navigate('/menu-overview');
  };

  const handleAddToCartClick = () => {
    navigate('/menu-overview');
  };

  return (
    <div className='relative flex flex-col items-start justify-start h-screen px-5 pt-16 space-y-8 overflow-y-auto'>
      <div className='relative w-full flex justify-center mx-auto mb-3.75'>
        <Buttons context='back' className='absolute top-5 left-1 z-10' onClick={handleBackClick}/>
        <div className="w-96 h-80">
          <Carousel showStatus={false} className="w-full h-full">
            <div>
              <Food_1 className='w-full h-full object-cover'/>
            </div>
            <div>
              <Food_2 className='w-full h-full object-cover'/>
            </div>
          </Carousel>
        </div>
      </div>

      <div className='mt-8 w-full'>
        <h2 className='text-3xl font-bold'>Fried Shrimp</h2>
      </div>
      <p className='text-lg text-justify mb-3.75'>Most whole Alaskan Red King Crabs get broken down into legs, claws, and lump meat. We offer all of these options as well in our online shop, but there is nothing like getting the whole dishes here.</p>
      
      <div className='mb-3.75'>
        <label className='text-lg font-medium my-1'>Note to restaurant</label>
        <textarea
          className='px-2 text-l bg-gray opacity-50 text-black font-medium rounded-lg w-full h-24 resize-none'
          name='foodItemNotes'
          onChange={handleChange}
          placeholder='Enter your notes here'
        />
      </div>

      <div className='flex justify-between items-center w-full mb-3.75'>
        <h2 className='text-3xl font-medium'>35.000 đ</h2>

        <div className="flex items-center">
          <Buttons context='minus' count={counter} setCount={setCounter} />
          <p className="mx-2 text-xl">{counter}</p>
          <Buttons context='plus' count={counter} setCount={setCounter} />
        </div>
      </div>

      <div className="flex justify-center w-full">
        <Buttons context='add_to_cart'onClick={handleAddToCartClick}/>
      </div>
    </div>
  );
};

export default MenuDetail;
