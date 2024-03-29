import React, { useState } from 'react';
import { Buttons } from '../../components';  
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authentication/authThunk';
import { MealMasterLogo } from '../../asset/images/mealmaster_logo/index.js';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authError = useSelector(state => state?.authentication?.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true); 

    const handleLogin = () => {
        dispatch(loginUser({ email, password }))
            .then((action) => {
                if (action && action.type) {
                    if (action.type === 'LOGIN_SUCCESS') {
                        navigate('/dashboard');
                    } else if (action.type === 'LOGIN_FAILURE') {
                        console.error("Login failed:", action.payload);
                    }
                } else {
                    console.error("Unexpected action returned:", action);
                }
            });
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
            <section className="flex flex-col items-center justify-center flex-1 bg-white p-10 w-full md:w-1/2">
                <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-md font-medium mb-4">Log in to manage your restaurant</p>
                {authError && <div className='text-error text-xs mt-1'>{authError}</div>}
                <form className="w-4/5">
                    <label className="block mb-5" htmlFor="emailInput">
                        Email
                        <input 
                            id='emailInput'
                            className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email Address for Login"
                        />
                    </label>
                    {authError && <div className='text-error text-xs mt-1'>{authError}</div>}

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
                                aria-label="Password for Login"
                            />
                            <Buttons context={showPassword ? "hide" : "view"} onClick={togglePasswordVisibility} className="absolute right-7 top-1/2 transform -translate-y-1/2" />
                        </div>
                    </label>
                    {authError && <div className='text-error text-xs mt-1'>{authError}</div>}

                    <div className="flex justify-start w-full">
                        <button onClick={redirectToPasswordRecovery} className="text-gray mb-5">
                            Forgot Password?
                        </button>
                    </div>

                    <div className="flex flex-col items-center w-full">
                        <Buttons context="login" type="button" className="mb-5" onClick={handleLogin}></Buttons>
                        <Buttons context="create_account_login" type="button" className="mb-5" onClick={redirectToSignup}></Buttons>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Login;