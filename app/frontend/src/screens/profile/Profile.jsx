import React from 'react'
import './profile.css'
import { Buttons} from '../../components';
import { BackIcon } from '../../asset/icons/button/index.js';
import { ProfilePic } from '../../asset/images/user_profile/index.js';


const Profile = () => {
  return (
    <div className='p-4'>
      <div className='m-4'>
        <h1 className='text-3xl font-bold'>Account</h1>
        <h2 className='text-lg text-justify mb-3.75 text-gray'>Edit and manage you account</h2>
      </div>
      
      <div className='bg-[#E6E6E8] col p-3 rounded-lg m-4'>

        <div className='flex flex-row'>
          <div className='flex flex-row basis-3/4'>
            <div className='w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-xl'>
              <ProfilePic className='w-full h-full rounded-xl'/>
            </div>
            <div className='col'>
              <h2 className='text-[#181818]'>Liem Nguyen</h2>
              <p className='text-[#181818]'>Ho Chi Minh City</p>
            </div>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>

        <div className='col'>
          <h2 className='text-[#181818]'>Email</h2>
          <p className='text-[#181818]'>liemnguyen@gmail.com</p>
        </div>

        <div className='col'>
          <h2 className='text-[#181818]'>Phone</h2>
          <p className='text-[#181818]'>+12 345 678 910</p>
        </div>

        <div className='flex flex-row'>
          <div className='col basis-3/4'>
            <h2 className='text-[#181818]'>E-wallet</h2>
            <p className='text-[#181818]'>234 9781 8465 ****</p>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>
        
        <div className='flex flex-row'>
          <div className='col basis-3/4'>
            <h2 className='text-[#181818]'>History</h2>
            <p className='text-[#181818]'>Check your latest order</p>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>
      </div>

      <div className='m-4'>
        <h1 className='text-3xl font-bold'>Help and feedback</h1>
        <h2 className='text-lg text-justify mb-3.75 text-gray'>Reach us with your feedback and question</h2>
      </div>
      

      <div className='bg-[#E6E6E8] col p-3 rounded-lg m-4'>
        <div className='flex flex-row'>
          <div className='col basis-3/4'>
            <h2 className='text-[#181818]'>FAQs</h2>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>
        
        <div className='flex flex-row'>
          <div className='col  basis-3/4'>
            <h2 className='text-[#181818]'>Contact us</h2>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>
      </div>

      <Buttons context='checkout'/>

    </div>
  )
}

export default Profile