import React, { useState } from 'react';
import { Buttons } from '../../components';  
import { MealMasterLogo } from '../../asset/images/mealmaster_logo/index.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true); 
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleContinueClick = () => {
        // Implement the login functionality
    };

    const handleGuestClick = () => {
        // Implement the create account functionality
    };

    const handleForgotPasswordClick = () => {
        // Implement the forgot password functionality
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex h-screen">
            {/* Left half (hidden on mobile screens) */}
            <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-gray-300 rounded-r-3xl">
                <MealMasterLogo className='w-50 h-50 rounded-xl'/> 
                <h2 className="text-2xl font-bold mb-5">MealMaster</h2>
                <p className="text-center text-md font-medium">Elevate customer experience with a QR code system</p>
            </div>
            
            {/* Right half */}
            <div className="flex flex-col items-center justify-start flex-1 bg-white p-10 w-full md:w-1/2">
                <div className="mt-1/3 mb-4">
                    <h1 className="flex flex-col items-center text-2xl font-bold mt-40">Welcome Back!</h1>
                    <p className="flex flex-col items-center text-md font-medium">Log in to manage your restaurant</p>
                </div>

                <label className="block w-full mb-5">
                    Email
                    <input 
                        id='emailInput'
                        className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                        type='text'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                {emailError && <div className='text-error text-xs mt-1'>{emailError}</div>}

                <label className="block w-full mb-5">
                    Password
                    <div className="relative">
                        <input 
                            id='passwordInput'
                            className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                            type={showPassword ? 'password' : 'text'}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={togglePasswordVisibility} className="absolute right-7 top-1/2 transform -translate-y-1/2">
                            {showPassword ? "Show" : "Hide"}
                        </button>
                    </div>
                </label>
                {passwordError && <div className='text-error text-xs mt-1'>{passwordError}</div>}

                <button onClick={handleForgotPasswordClick} className="text-gray mb-5 w-full text-left self-start">
                    Forgot Password?
                </button>
                <Buttons context="login" className="mb-5" onClick={handleContinueClick}></Buttons>
                <Buttons context="create_account_login" className="mb-5" onClick={handleGuestClick}></Buttons>
            </div>
        </div>
    );
};

export default Login;
