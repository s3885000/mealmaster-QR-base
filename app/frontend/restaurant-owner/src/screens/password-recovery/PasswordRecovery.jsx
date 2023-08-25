import React, { useState } from 'react';
import { Buttons } from '../../components';  
import { MealMasterLogo } from '../../asset/images/mealmaster_logo/index.js';

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [message, setMessage] = useState(''); // to show success or error messages

    const handleSendEmailClick = () => {
        // Implement the email sending functionality here

        // setMessage("Email sent successfully!");
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
                <h1 className="text-2xl font-bold mt-40 mb-4">Password Recovery</h1>
                <p className="text-md font-medium mb-4">Enter your email to recover your password</p>

                <form className="w-full">
                    <label className="block w-full mb-5" htmlFor="emailInput">
                        Email
                        <input 
                            id='emailInput'
                            className='w-full h-10 px-7 text-sm bg-tertiary text-placeholders font-medium rounded-2xl mt-2'
                            type='text'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email Address for Password Recovery"
                        />
                    </label>
                    {emailError && <div className='text-error text-xs mt-1'>{emailError}</div>}
                    {message && <div className='text-success text-xs mt-1'>{message}</div>}

                    <Buttons context="email" className="mb-5" onClick={handleSendEmailClick}></Buttons>
                </form>
            </section>
        </main>
    );
};

export default PasswordRecovery;
