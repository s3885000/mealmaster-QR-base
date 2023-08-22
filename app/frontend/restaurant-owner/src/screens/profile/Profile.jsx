import React from 'react'
// import './profile.css'
import { Buttons} from '../../components';
// import { BackIcon } from '../../asset/icons/button/index.js';
// import { ProfilePic } from '../../asset/images/user_profile/index.js';


const Profile = () => {
  return (
    <div className='p-4'>
        <div className='m-4'>
          <h1 className='text-2xl font-bold'>Profile</h1>
          <h2 className='text-lg text-justify mb-3.75 text-gray'>Edit and manage your profile</h2>
        </div>
        <form>
              <label className="block text-2xl font-bold">First Name</label>
              <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="John" type="text" name="firstName" />

              <label className='block text-2xl font-bold'>Last Name</label>
              <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="Smith" type="text" name="lastName" />

              <label className='block text-2xl font-bold'>Email</label>
              <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="example@example.com" type="text" name="email" />

              <label class="block pt-4">
                <label className="block text-2xl font-bold">Profile Picture</label>
                <input  type="file" name="table_name" accept='image/*' hidden/>
                <div className='outline-dashed outline-2 outline-black rounded-md w-fit grid justify-items-center p-4'>
                  <p className='text-center'>Recommended Image Sizes: 400px x 300px<br/>Click to select a file from your device (png or jpeg)</p>
                </div>
              </label>
          </form>

          <Buttons context='cancel'/>
          <Buttons context='save'/>

        <div className='m-4'>
          <h1 className='text-2xl font-bold'>Restaurant</h1>
          <h2 className='text-medium text-justify mb-3.75 text-gray'>Edit and manage your restaurant</h2>
        </div>

        <form>
              <label className="block text-2xl font-bold">Name</label>
              <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="Haidilao" type="text" name="restaurantName" />

              <label className='block text-2xl font-bold'>Address</label>
              <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="HCMC" type="text" name="restaurantAddress" />

              <label className='block text-2xl font-bold'>Contact Email</label>
              <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="example@example.com" type="text" name="email" />

              <label className='block text-2xl font-bold'>Contact Number</label>
              <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="1234567890" type="text" name="number" />

              <label class="block pt-4">
                <label className='block text-2xl font-bold'>Restaurant Logo</label>
                <input  type="file" name="table_name" accept='image/*' hidden/>
                <div className='outline-dashed outline-2 outline-black rounded-md w-fit grid justify-items-center p-4'>
                  <p className='text-center'>Recommended Image Sizes: 400px x 300px<br/>Click to select a file from your device (png or jpeg)</p>
                </div>
              </label>

              <label class="block pt-4">
                <label className='block text-2xl font-bold'>Banner Image</label>
                <input  type="file" name="table_name" accept='image/*' hidden/>
                <div className='outline-dashed outline-2 outline-black rounded-md w-fit grid justify-items-center p-4'>
                  <p className='text-center'>Recommended Image Sizes: 400px x 300px<br/>Click to select a file from your device (png or jpeg)</p>
                </div>
              </label>
          </form>

        <Buttons context='cancel'/>
        <Buttons context='save'/>

        </div>
  )
}

export default Profile;