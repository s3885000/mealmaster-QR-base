import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Logo } from '../../asset/images/mealmaster_logo/index.js';
import { Buttons } from '../../components';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authThunk.js';

const Login = () => {
    const { restaurantId, tableNo } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ phoneError, setPhoneError ] = useState('');

    const handleContinueClick = async () => {
        const phoneNumber = document.getElementById('phoneInput').value;

        if(phoneNumber === '') {
            setPhoneError('* Phone number is required');
            return;
        }

        //Clear the error
        setPhoneError('');

        //Trigger login action with the entered phone number and wait for a response
        const IsPhoneNumberAvailable = await dispatch(loginUser({ phone_number: phoneNumber }));

        if(IsPhoneNumberAvailable) {
            navigate('/login-password');
        } else {
            setPhoneError('* Phone number not found! Please sign up or use different phone number.');
        }

    };

    const handleGuestClick = () => {
        //Trigger login action with guest flag
        dispatch(loginUser({}, true));
        navigate('/guest'); 
    };

    const handleSignupClick = () => {
        navigate('/signup'); 
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-white px-5 space-y-6'>
            <div className='flex items-center justify-center w-38 h-38 bg-primary rounded-full mb-5'>
                <Logo className='w-full h-full rounded-2xl'/>
            </div>
            <h1 className='font-bold text-2xl'>MealMaster</h1>
            <p className='text-sm font-medium mb-16'>Log In or Sign Up for free</p>
            <div className='mb-1'>
                <div className='relative w-80 h-14'>
                    <input 
                        id='phoneInput'
                        className='w-full h-full px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl'
                        type='text'
                        placeholder='Mobile Phone'
                    />
                </div>
                {phoneError && <div className='text-red-500 text-xs mt-1'>{phoneError}</div>}
            </div>
            <Buttons context='continue' className='mb-1 w-full' onClick={handleContinueClick}/>
            <Buttons context='guest' className='mb-1 w-full' onClick={handleGuestClick}/>
            <button className='text-sm font-medium text-placeholders' onClick={handleSignupClick}>Convert to Register User</button>
        </div>
    );
    
    
};

export default Login;
