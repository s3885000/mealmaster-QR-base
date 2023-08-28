import React from 'react';
import { Buttons, Navigation } from '../../components';
import './profile.css';

const PopupFooter = ({ buttons }) => (
    <div className='flex flex-row justify-center space-x-5'>
        {buttons.map((btn, index) => (
            <Buttons key={index} context={btn.context} onClick={btn.onClick} />
        ))}
    </div>
);

const ImageUploader = ({ label, name }) => (
    <label className="block mb-10">
        <span className='block text-2xl font-bold'>{label}</span>
        <input type="file" name={name} accept='image/*' hidden />
        <div className='border-dashed border-2 border-black rounded-md p-4'>
            <p className='text-center'>
                Recommended Image Sizes: 400px x 400px
                <br />
                Click to select a file from your device (png or jpeg)
            </p>
        </div>
    </label>
);

const InputField = ({ label, placeholder, name }) => (
    <>
        <label className="block text-2xl font-bold mb-2">{label}</label>
        <input className="border border-gray-400 rounded-md placeholder-gray-400 w-full p-2 mb-5" placeholder={placeholder} type="text" name={name} />
    </>
);

const Profile = () => {
    return (
        <div className="tables-screen h-screen flex flex-col pl-3 pr-3">
            <Navigation />

            <div className='flex-auto p-4 md:p-6'>
                <h1 className='text-3xl font-bold mb-4'>Profile</h1>
                <div className='bg-white px-4 md:px-6 lg:px-8 py-4 rounded-2xl w-full mx-auto mb-4'>
                    <form>
                        <ImageUploader label="Profile Picture" name="profile_picture" />
                        <InputField label="First Name" placeholder="John" name="firstName" />
                        <InputField label="Last Name" placeholder="Smith" name="lastName" />
                        <InputField label="E-mail" placeholder="example@example.com" name="email" />
                        <PopupFooter buttons={[
                            { context: 'cancel' },
                            { context: 'save' }
                        ]} />
                    </form>
                </div>

                <h1 className='text-3xl font-bold mb-4'>Restaurant</h1>
                <div className='bg-white px-4 md:px-6 lg:px-8 py-4 rounded-2xl w-full mx-auto'>
                    <form>
                        <ImageUploader label="Restaurant Logo" name="restaurant_logo" />
                        <ImageUploader label="Banner Image" name="banner_image" />
                        <InputField label="Name" placeholder="Haidilao" name="restaurantName" />
                        <InputField label="Address" placeholder="HCMC" name="restaurantAddress" />
                        <InputField label="Contact E-mail" placeholder="example@example.com" name="contactEmail" />
                        <InputField label="Contact Number" placeholder="1234567890" name="contactNumber" />
                        <PopupFooter buttons={[
                            { context: 'cancel' },
                            { context: 'save' }
                        ]} />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Profile;
