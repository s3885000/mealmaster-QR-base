import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons, Items, Search } from '../../components';

const NearbyRestaurant = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/home'); 
  };

  const dummyData = Array(10).fill(0); // Replace this with actual data once you have the API integrated

  return (
    <div className='flex flex-col items-center justify-start min-h-screen px-5 pt-20 '>
      <div className='flex items-center justify-between w-full'>
        <Buttons context='back' onClick={handleBackClick}/>
        <h1 className='text-black text-2xl'>Nearby Restaurants</h1>
      </div>

      <Search className="mb-5"/> 
      <div className='flex flex-col space-y-5'> 
        {dummyData.map((data, index) => (
          <Items key={index} type='nearby_restaurant' /> // Pass in actual data once you have the API integrated
        ))}
      </div>
    </div>
  );
};

export default NearbyRestaurant;
