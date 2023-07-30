import React from 'react';
import { Header, Navigation, Search, Banner, Items } from '../../components';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleSeeMoreClick = (route) => {
    navigate(route);
  };

  return (
    <div>
      <Header />
      <Search />
      <div className="mt-7">
        <Banner />

        <div className='flex justify-between items-center px-4 mt-7'>
          <h1 className='text-xl overflow-hidden whitespace-nowrap overflow-ellipsis'>Nearby Restaurants</h1>
          <p onClick={() => handleSeeMoreClick('/nearby-restaurants')} className='text-primary cursor-pointer'>
            See More
          </p>
        </div>

        <div className="flex overflow-x-scroll hide-scrollbar px-3 pb-5 space-x-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className='space-x-34'>
              <Items type='home_nearby_restaurant' />
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center px-4 mt-7'>
          <h1 className='text-xl overflow-hidden whitespace-nowrap overflow-ellipsis'>History</h1>
          <p onClick={() => handleSeeMoreClick('/history')} className='text-primary cursor-pointer'>
            See More
          </p>
        </div>

        <div className="flex overflow-x-scroll hide-scrollbar px-3 pb-5 space-x-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className='space-x-34'>
              <Items type='home_history' />
            </div>
          ))}
        </div>

      </div>
      <Navigation />
    </div>
  );
};

export default Home;
