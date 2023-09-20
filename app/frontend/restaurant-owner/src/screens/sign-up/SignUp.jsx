import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Buttons } from '../../components';  
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../redux/actions/authentication/authThunk';
import { MealMasterLogo } from '../../asset/images/mealmaster_logo/index.js';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Fetching the general auth error using useSelector
    const authError = useSelector(state => state?.authentication?.error);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true); 
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleCreateAccountClick = () => {
        dispatch(signUpUser({name, email, password}))
            .then((action) => {
                if (action && action.type) {
                    if (action.type === 'SIGNUP_SUCCESS') {
                        navigate('/dashboard');
                    } else if (action.type === 'SIGNUP_FAILURE') {
                        console.error("Signup failed:", action.payload);
                        setNameError(action.payload.nameError);
                        setEmailError(action.payload.emailError);
                        setPasswordError(action.payload.passwordError);
                    }
                } else {
                    console.error("Unexpected action returned:", action);
                }
            });
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
            <section className="flex flex-col items-center justify-center flex-1 bg-white p-10 w-full md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
                <p className="text-md font-medium mb-4">Create an account to manage your restaurant</p>

                {/* Display the general auth error */}
                {authError && <div className='text-error text-xs mt-1 mb-4'>{authError}</div>}

                <form className="w-4/5">
                    {/* Name Input */}
                    <label className="block mb-5" htmlFor="nameInput">
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

                    {/* Email Input */}
                    <label className="block mb-5" htmlFor="emailInput">
                        Email
                        <input 
                            id='emailInput'
                            className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email Address for Signup"
                        />
                    </label>
                    {emailError && <div className='text-error text-xs mt-1'>{emailError}</div>}

                    {/* Password Input */}
                    <label className="block mb-5" htmlFor="passwordInput">
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

                    <div className="flex flex-col items-center w-full">
                        <Buttons context="create_account_signup" className="mb-5" onClick={handleCreateAccountClick}></Buttons>
                        <Buttons context="already" className="mb-5" onClick={handleLoginClick}></Buttons>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Signup;
