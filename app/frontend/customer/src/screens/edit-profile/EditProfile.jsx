import React from 'react'
import './editprofile.css'
import { Buttons} from '../../components';
import { BackIcon } from '../../asset/icons/button/index.js';
import { ProfilePic } from '../../asset/images/user_profile/index.js';

const EditProfile = () => {
    return (
        <div className='p-4'>
            <div className='m-4'>
                <h1 className='text-2xl font-bold'>Account</h1>
                <h2 className='text-lg text-justify mb-3.75 text-gray'>Edit and manage you account</h2>
            </div>

            <div className='w-28 h-28 sm:w-28 sm:h-28 bg-primary rounded-xl mr-4'>
              <ProfilePic className='w-full h-full rounded-xl'/>
            </div>

            <div className='flex flex-row'>
                <div className='bg-[#E6E6E8] p-3 rounded-lg m-4 basis-1/2'>
                    <div className='col my-2 mx-2'>
                        <h2 className='text-[#181818] opacity-30'>First name</h2>
                        <p className='text-[#181818] font-medium'>Liem</p>
                    </div>
                </div>
                <div className='bg-[#E6E6E8] p-3 rounded-lg m-4 basis-1/2'>
                    <div className='col my-2 mx-2'>
                        <h2 className='text-[#181818] opacity-30'>Last name</h2>
                        <p className='text-[#181818] font-medium'>Nguyen</p>
                    </div>
                </div>
            </div>

            <div className='bg-[#E6E6E8] p-3 rounded-lg m-4'>
                <div className='col my-2 mx-2'>
                    <h2 className='text-[#181818] opacity-30'>Place</h2>
                    <p className='text-[#181818] font-medium'>Ho Chi Minh city, Vietnam</p>
                </div>
            </div>

            <div className='bg-[#E6E6E8] p-3 rounded-lg m-4'>
                <div className='col my-2 mx-2'>
                    <h2 className='text-[#181818] opacity-30'>Email</h2>
                    <p className='text-[#181818] font-medium'>liemnguyen@gmail.com</p>
                </div>
            </div>

            <div className='bg-[#E6E6E8] p-3 rounded-lg m-4'>
                <div className='col my-2 mx-2'>
                    <h2 className='text-[#181818] opacity-30'>Phone</h2>
                    <p className='text-[#181818] font-medium'>+12 345 678 910</p>
                </div>
            </div>

            <Buttons context='save'/>
        </div>
    )
}

export default EditProfile;