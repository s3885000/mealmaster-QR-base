import React, { useState } from 'react';
import { Logo } from '../../asset/images/mealmaster_logo/index.js';
import { Buttons } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/authThunk.js';

const LoginPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const phoneNumber = location.state.phoneNumber;
    const [ passwordError, setPasswordError ] = useState('');

    const handleContinueClick = async () => {
        const password = document.getElementById('passwordInput').value;

        if (password === '') {
            setPasswordError('* Password is required!');
            return;
        }

        //Clear the error
        setPasswordError('');

        const credentials = { phone_number: phoneNumber, password };

        //Trigger login action with the credentials
        const isAuthenticated = await dispatch(loginUser(credentials));

        if (isAuthenticated) {
            navigate('/home')
        } else {
            setPasswordError('* Invalid password! Please try again.')
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-white px-5 space-y-6'>
            <div className='flex items-center justify-center w-38 h-38 bg-primary rounded-full mb-5'>
                <Logo className='w-full h-full rounded-2xl'/>
            </div>
            <h1 className='font-bold text-2xl mb-5'>MealMaster</h1>
            <p className='text-sm font-medium mb-16'>Enter your password</p>
            <div className='mb-1'>
                <div className='relative w-80 h-14 mb-5'>
                    <input 
                        id='passwordInput'
                        className='w-full h-full px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl'
                        type='password'
                        placeholder='Password'
                    />
                </div>
                {passwordError && <div className='text-red-500 text-xs mt-1'>{passwordError}</div>}
            </div>
            <Buttons context='continue' className='mb-1 w-full' onClick={handleContinueClick}/>
            <div className='mb-5'></div>
        </div>
    );
};

export default LoginPassword;
