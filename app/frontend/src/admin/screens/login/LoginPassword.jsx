import React from 'react';
import { Logo } from '../../asset/images/mealmaster_logo/index.js';
import { Buttons } from '../../components';

const LoginPassword = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-white px-5 space-y-6'>
            <div className='flex items-center justify-center w-38 h-38 bg-primary rounded-full mb-5'>
                <Logo className='w-full h-full rounded-2xl'/>
            </div>
            <h1 className='font-bold text-2xl mb-5'>MealMaster</h1>
            <p className='text-sm font-medium mb-16'>Enter your password</p>
            <div className='relative w-80 h-14 mb-5'>
                <input 
                    className='w-full h-full px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl'
                    type='password'
                    placeholder='Password'
                />
            </div>
            <Buttons context='continue' className='mb-1 w-full'/>
            <div className='mb-5'></div>
        </div>
    );
};

export default LoginPassword;
