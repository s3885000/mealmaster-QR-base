import React from 'react'
// import './profile.css'
import { Buttons} from '../../components';
// import { BackIcon } from '../../asset/icons/button/index.js';
// import { ProfilePic } from '../../asset/images/user_profile/index.js';


const Profile = () => {
  const PopupFooter = ({ buttons }) => (
    <div className='flex flex-row justify-center'>
      {buttons.map((btn, index) => (
        <Buttons key={index} context={btn.context} className='m-5' onClick={btn.onClick} />
      ))}
    </div>
  );

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Profile</h1>
      <div className={`bg-white px-6 py-4 rounded-3xl w-full`}>
        <form>
          <label class="block">
            <label className='block text-2xl font-bold'>Profile Picture</label>
            <input  type="file" name="table_name" accept='image/*' hidden className='w-fit'/>
            <div className='outline-dashed outline-2 outline-black rounded-md justify-items-center p-4'>
              <p className='text-center'>Recommended Image Sizes: 400px x 300px<br/>Click to select a file from your device (png or jpeg)</p>
            </div>
          </label>

          <label className="block text-2xl font-bold">First Name</label>
          <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="John" type="text" name="firstName" />

          <label className='block text-2xl font-bold'>Last Name</label>
          <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="Smith" type="text" name="lastName" />

          <label className='block text-2xl font-bold'>Email</label>
          <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="example@example.com" type="text" name="email" />

          <PopupFooter buttons={[
            { context: 'cancel'},
            { context: 'save'}
          ]} />
        </form>
      </div>
      

        

      <h1 className='text-2xl font-bold'>Restaurant</h1>
      <div className={`bg-white px-6 py-4 rounded-3xl w-full`}>
        <form>
          <label class="block place-self-center">
            <label className='block text-2xl font-bold'>Restaurant Logo</label>
            <input  type="file" name="table_name" accept='image/*' hidden className='w-fit'/>
            <div className='outline-dashed outline-2 outline-black rounded-md justify-items-center p-4'>
              <p className='text-center'>Recommended Image Sizes: 400px x 300px<br/>Click to select a file from your device (png or jpeg)</p>
            </div>
          </label>

          <label class="block place-self-center">
            <label className='block text-2xl font-bold'>Banner Image</label>
            <input  type="file" name="table_name" accept='image/*' hidden className='w-fit'/>
            <div className='outline-dashed outline-2 outline-black rounded-md justify-items-center p-4'>
              <p className='text-center'>Recommended Image Sizes: 400px x 300px<br/>Click to select a file from your device (png or jpeg)</p>
            </div>
          </label>

          <label className="block text-2xl font-bold">Name</label>
          <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="Haidilao" type="text" name="restaurantName" />

          <label className='block text-2xl font-bold'>Address</label>
          <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="HCMC" type="text" name="restaurantAddress" />

          <label className='block text-2xl font-bold'>Contact Email</label>
          <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="example@example.com" type="text" name="email" />

          <label className='block text-2xl font-bold'>Contact Number</label>
          <input className="border border-gray rounded-md placeholder-slate-400 w-full p-2" placeholder="1234567890" type="text" name="number" />

          <PopupFooter buttons={[
            { context: 'cancel'},
            { context: 'save'}
          ]} />
        </form>
      </div>
    </div>
  )
}

export default Profile;