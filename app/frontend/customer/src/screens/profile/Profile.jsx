import React, { useEffect } from 'react'
import './profile.css'
import { Buttons} from '../../components';
import { BackIcon } from '../../asset/icons/button/index.js';
import { ProfilePic } from '../../asset/images/user_profile/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/userActions';


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;

  if (user?.is_guest) {
    return (
      <div className='p-4 flex flex-col h-full'>
        <div className='m-4 flex-grow'>
          <h1 className='text-2xl font-bold mb-2'>Account</h1>
            <h2 className='first-word-spacing text-justify text-md mb-2'>Hello guest user <span className="font-bold">{user?.guest_id}</span> !!! Some functionality will be disabled.</h2>
            <h2 className='text-md mb-2'>Sign up to access our app's full potential.</h2>
        </div>

        <div className="flex flex-col justify-end w-full bg-white pb-3 pt-2">
          <Buttons context='sign_up'/>

          <div className='m-4'>
            <h1 className='text-2xl font-bold'>Help and feedback</h1>
            <h2 className='text-medium text-justify mb-3.75 text-gray'>Reach us with your feedback and question</h2>
          </div>

          <div className='bg-[#E6E6E8] col p-3 rounded-lg m-4'>
            <div className='flex flex-row my-2 mx-2'>
              <div className='col basis-3/4'>
                <h2 className='text-[#181818] opacity-30'>FAQs</h2>
              </div>
              <div className='flex justify-end items-center basis-1/4'>
                <BackIcon className="rotate-180" />
              </div>
            </div>

            <div className='flex flex-row my-2 mx-2'>
              <div className='col  basis-3/4'>
                <h2 className='text-[#181818] opacity-30'>Contact us</h2>
              </div>
              <div className='flex justify-end items-center basis-1/4'>
                <BackIcon className="rotate-180" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const fullName = user ? `${user.first_name} ${user.last_name}` : '';

  return (
    <div className='p-4'>
      <div className='m-4'>
        <h1 className='text-2xl font-bold'>Account</h1>
        <h2 className='text-lg text-justify mb-3.75 text-gray'>Edit and manage you account</h2>
      </div>

      <div className='bg-[#E6E6E8] col p-3 rounded-lg m-4'>

        <div className='flex flex-row my-2 mx-2'>
          <div className='flex flex-row basis-3/4'>
            <div className='w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-xl mr-4'>
              <ProfilePic className='w-full h-full rounded-xl'/>
            </div>
            <div className='col'>
              <h2 className='text-[#181818]'>{fullName}</h2>
              <p className='text-[#181818] opacity-30'>Ho Chi Minh city</p>
            </div>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>

        <div className='col my-2 mx-2'>
          <h2 className='text-[#181818] opacity-30'>Email</h2>
          <p className='text-[#181818] opacity-50 font-medium'>{user?.email}</p>
        </div>

        <div className='col my-2 mx-2'>
          <h2 className='text-[#181818] opacity-30'>Phone</h2>
          <p className='text-[#181818] opacity-50 font-medium'>{user?.phone_number}</p>
        </div>

        <div className='flex flex-row my-2 mx-2'>
          <div className='col basis-3/4'>
            <h2 className='text-[#181818] opacity-30'>E-wallet</h2>
            <p className='text-[#181818] opacity-50 font-medium'>2374 9781 8465 ****</p>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>
      </div>

      <div className='m-4'>
        <h1 className='text-2xl font-bold'>Help and feedback</h1>
        <h2 className='text-medium text-justify mb-3.75 text-gray'>Reach us with your feedback and question</h2>
      </div>


      <div className='bg-[#E6E6E8] col p-3 rounded-lg m-4'>
        <div className='flex flex-row my-2 mx-2'>
          <div className='col basis-3/4'>
            <h2 className='text-[#181818] opacity-30'>FAQs</h2>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>

        <div className='flex flex-row my-2 mx-2'>
          <div className='col  basis-3/4'>
            <h2 className='text-[#181818] opacity-30'>Contact us</h2>
          </div>
          <div className='flex justify-end items-center basis-1/4'>
            <BackIcon className="rotate-180" />
          </div>
        </div>
      </div>

      <Buttons context='logout'/>

    </div>
  )
}

export default Profile;