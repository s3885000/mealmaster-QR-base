import React, { useState } from 'react';
import { Buttons } from '../../components';  
import { useNavigate } from 'react-router-dom';
import { MealMasterLogo } from '../../asset/images/mealmaster_logo/index.js';

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true); 
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleCreateAccountClick = () => {
        // Implement the signup functionality
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className="flex h-screen">
            {/* Left half */}
            <section className="hidden md:flex flex-col items-center justify-center flex-1 bg-gray-300 rounded-r-3xl">
                <MealMasterLogo className='w-50 h-50 rounded-xl'/> 
                <h2 className="text-2xl font-bold mb-5">MealMaster</h2>
                <p className="text-center text-md font-medium">Elevate customer experience with a QR code system</p>
            </section>
            
            {/* Right half */}
            <section className="flex flex-col items-center justify-start flex-1 bg-white p-10 w-full md:w-1/2">
                <h1 className="text-2xl font-bold mt-40 mb-4">Create an Account</h1>
                <p className="text-md font-medium mb-4">Create an account to manage your restaurant</p>

                <form className="w-full">
                    <label className="block w-full mb-5" htmlFor="nameInput">
                        Name
                        <input 
                            id='nameInput'
                            className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-label="Name for Signup"
                        />
                    </label>
                    {nameError && <div className='text-error text-xs mt-1'>{nameError}</div>}

                    <label className="block w-full mb-5" htmlFor="emailInput">
                        Email
                        <input 
                            id='emailInput'
                            className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                            type='email' // Change type to email for better validation
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email Address for Signup"
                        />
                    </label>
                    {emailError && <div className='text-error text-xs mt-1'>{emailError}</div>}

                    <label className="block w-full mb-5" htmlFor="passwordInput">
                        Password
                        <div className="relative">
                            <input 
                                id='passwordInput'
                                className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl'
                                type={showPassword ? 'password' : 'text'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Password for Signup"
                            />
                            <Buttons context={showPassword ? "hide" : "view"} onClick={togglePasswordVisibility} className="absolute right-7 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </label>
                    {passwordError && <div className='text-error text-xs mt-1'>{passwordError}</div>}

                    <Buttons context="create_account_signup" className="mb-5" onClick={handleCreateAccountClick}></Buttons>
                    <Buttons context="already" className="mb-5" onClick={handleLoginClick}></Buttons>
                </form>
            </section>
        </main>
    );
};

export default Signup;
