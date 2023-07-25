import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FirstBanner, SecondBanner } from '../../asset/images/home_banner/index.js';

const Banner = () => {
  return (
    <div className='relative w-full flex justify-center mx-auto mb-3.75'>
      <div className="w-80 h-40">
        <Carousel showStatus={false} showThumbs={false} className="w-full h-full">
          <div>
            <FirstBanner className='w-full h-full object-cover'/>
          </div>
          <div>
            <SecondBanner className='w-full h-full object-cover'/>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
