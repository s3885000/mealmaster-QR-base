import React from 'react';
import { Logo } from '../../asset/images/mealmaster_logo/index.js';
import './loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <Logo className='w-50 h-50 rounded-2xl mb-5' />
            <p className="loading-text mb-3">QR Your Way to Deliciousness!</p>
            <div className="loading-circle"></div>
        </div>
    );
}

export default Loading;
