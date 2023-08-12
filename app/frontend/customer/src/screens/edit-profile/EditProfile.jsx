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
            <div className='flex flex-row'>
                <div className='bg-[#E6E6E8] p-3 rounded-lg m-4'></div>
                <div className='bg-[#E6E6E8] p-3 rounded-lg m-4'></div>
            </div>
        </div>
    )
}

export default EditProfile;