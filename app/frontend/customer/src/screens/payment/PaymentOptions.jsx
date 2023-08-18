import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';

const PaymentOptions = () => {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { last4: '1234', brand: 'Visa' },
        { last4: '5678', brand: 'MasterCard' },
        { last4: '9012', brand: 'American Express' },
    ];

    const handleBackClick = () => navigate('/cart');
    const handleCardClick = (index) => setSelectedCard(index);
    const handleAddPaymentMethod = () => navigate('/payment');

    return (
        <div className='flex flex-col items-center justify-start h-screen px-5 pt-20 space-y-6 bg-gray-100'>
            <div className='flex items-center justify-between w-full mb-5'>
                <Buttons context='back' className='mr-6' onClick={handleBackClick} />
                <h1 className='text-black text-2xl'>Payment Options</h1>
            </div>
            <div className='flex flex-col items-center w-full space-y-5'>
                {cards.map((card, index) => (
                    <div 
                        key={index}
                        className={`border border-gray bg-white rounded-lg w-full md:w-80 p-4 flex items-center justify-between cursor-pointer hover:shadow-lg ${selectedCard === index ? 'shadow-lg' : 'shadow-md'}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold">{card.brand}</span>
                            <span>{card.last4}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {selectedCard === index && <span className="bg-gray text-white text-sm rounded-full px-2 py-1">Default</span>}
                            <div className={`w-4 h-4 border rounded-full relative ${selectedCard === index ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                                {selectedCard === index && <span className="absolute inset-0 flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center w-full mt-10">
                <Buttons context="add_card" onClick={handleAddPaymentMethod}></Buttons>
            </div>
        </div>
    );
};

export default PaymentOptions;
