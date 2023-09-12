import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Buttons } from '../../components';
import { StripeLogoIcon } from '../../asset/icons/box';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCards, fetchDefaultCard, setDefaultCard } from '../../redux/actions/paymentActions';
import { AmexLogoIcon, VisaLogoIcon, MasterCardIcon, UnionPayLogoIcon } from '../../asset/icons/bank-brand';

const cardIcons = {
    amex: <AmexLogoIcon />,
    mastercard: <MasterCardIcon />,
    unionpay: <UnionPayLogoIcon />,
    visa: <VisaLogoIcon />
};

const PaymentOptions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cards = useSelector(state => state.payment.cards);
    const loading = useSelector(state => state.payment.loading);
    const error = useSelector(state => state.payment.error);

    const defaultCard = useSelector(state => state.payment.defaultCard);
    


    // console.log('Cards from Redux: ', cards);
    // console.log('Default Card ID from Redux: ', defaultCard);

    const [selectedCard, setSelectedCard] = useState(null);
    useEffect(() => {
        const defaultCardDetails = cards.find(card => card.id === defaultCard?.id);
        if (defaultCardDetails) {
            const index = cards.indexOf(defaultCardDetails);
            const newSelectedCard = { index, details: defaultCardDetails.card };
            if (!selectedCard || (selectedCard.index !== newSelectedCard.index)) {
                setSelectedCard(newSelectedCard);
            }
        }
        console.log("selectedCard after useEffect:", selectedCard);
    }, [cards, defaultCard]);
    
    
    console.log("PaymentOptions component rendered with defaultCard:", defaultCard);
    
    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([dispatch(fetchCards()), dispatch(fetchDefaultCard())]);
        }
        fetchData();
    }, [dispatch]);
    
    const handleBackClick = () => navigate('/cart');
    const handleCardClick = (index, card) => {
        const cardId = cards[index].id;
        console.log("Clicked card ID:", cardId);
        setSelectedCard({ index, details: card });
        dispatch(setDefaultCard(cardId));
    };
    
    const handleAddPaymentMethod = () => navigate('/payment');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex flex-col items-center justify-start h-screen px-5 pt-20 space-y-6 bg-gray-100 '>
            <div className='flex items-center justify-between w-full mb-5'>
                <Buttons context='back' className='mr-6' onClick={handleBackClick} />
                <h1 className='text-black text-2xl'>Payment Options</h1>
            </div>
            <div className='flex flex-col items-center w-full space-y-5 '>
            {cards.map((paymentMethod, index) => {
                console.log("Iterating card with index:", index, "selectedCard.index:", selectedCard ? selectedCard.index : 'N/A');
                return (
                    <div 
                    key={paymentMethod.id}
                    className={`bg-white w-full md:w-80 p-4 flex items-center rounded-lg justify-between cursor-pointer hover:shadow-lg ${selectedCard && selectedCard.index === index ? 'shadow-lg' : 'shadow-md'}`}
                    onClick={() => handleCardClick(index, paymentMethod.card)}>
                        <div className="flex items-center space-x-4 ">
                            <div className="flex items-center justify-center">
                                {cardIcons[paymentMethod.card.brand.toLowerCase()]}
                            </div>
                            <div>
                                <div className="">
                                    <span>•••• •••• •••• {paymentMethod.card.last4}</span>
                                    {selectedCard && selectedCard.index === index && (
                                        <>
                                            <div className="text-gray-600 capitalize font-semibold text-sm">
                                                {paymentMethod.card.brand}
                                            </div>
                                            <div className="text-xs mt-1 text-gray-600">
                                                Exp: {paymentMethod.card.exp_month}/{paymentMethod.card.exp_year}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {selectedCard && selectedCard.index === index && <span className="bg-gray text-white text-sm rounded-full px-2 py-1">Default</span>}
                            <div className={`w-4 h-4 border rounded-full relative ${selectedCard && selectedCard.index === index ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                                {selectedCard && selectedCard.index === index && <span className="absolute inset-0 flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </span>}
                            </div>
                        </div>
                    </div>
                )
                
            })}
            </div>
            <div className="flex flex-col justify-end w-full bg-white pb-4">
                <div className="flex items-center justify-center mb-3">
                    <span className="text-xs italic">Powered by</span>
                    <StripeLogoIcon className="ml-2" />
                </div>
                <Buttons context="add_card" onClick={handleAddPaymentMethod}></Buttons>
            </div>
        </div>
    );
};

export default PaymentOptions;