import React, { useState } from 'react';
import { Buttons } from '../../components';  
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authentication/authThunk'; // Import the action creator
import { MealMasterLogo } from '../../asset/images/mealmaster_logo/index.js';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authError = useSelector(state => state?.authentication?.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true); 
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleLogin = () => {
        dispatch(loginUser(email, password));
    };

    const redirectToSignup = () => {
        navigate('/signup');
    }

    const redirectToPasswordRecovery = () => {
        navigate('/password-recovery');
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
                <h1 className="text-2xl font-bold mt-40 mb-4">Welcome Back!</h1>
                <p className="text-md font-medium mb-4">Log in to manage your restaurant</p>

                <form className="w-full">
                    <label className="block w-full mb-5" htmlFor="emailInput">
                        Email
                        <input 
                            id='emailInput'
                            className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                            type='email' // Use email type for email input
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email Address for Login"
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
                                aria-label="Password for Login"
                            />
                            <Buttons context={showPassword ? "hide" : "view"} onClick={togglePasswordVisibility} className="absolute right-7 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </label>
                    {passwordError && <div className='text-error text-xs mt-1'>{passwordError}</div>}

                    <button onClick={redirectToPasswordRecovery} className="text-gray mb-5 w-full text-left self-start">
                        Forgot Password?
                    </button>
                    <Buttons context="login" className="mb-5" onClick={handleLogin}></Buttons>
                    <Buttons context="create_account_login" className="mb-5" onClick={redirectToSignup}></Buttons>
                </form>
            </section>
        </main>
    );
};

export default Login;
