import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Buttons } from '../../components';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItemDetails } from '../../redux/actions/menuItemDetailsActions';
import './menudetail.css';
import { addToCart, decreaseItemQuantity } from '../../redux/actions/cartActions';
import { decodeToken } from '../../services/api.js';


const formatPrice = (price) => {
  return price ? price.toLocaleString('en-US'): "N/A";
}

const MenuDetail = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const menuItemDetailsState = useSelector(state => state.menuItemDetails);
  const { loading, error, menuItem } = menuItemDetailsState;

  const dispatch = useDispatch();


  const [foodItemNotes, setFoodItemNotes] = useState('');
  const [counter, setCounter] = useState(0);

  const handleChange = (event) => {
    setFoodItemNotes(event.target.value);
  };

  const handleAddToCart = () => {
    const decodedToken = decodeToken();
    if (decodedToken && decodedToken.sub) {
        const userId = parseInt(decodedToken.sub);

        const itemToAdd = {
            ...menuItem,
            quantity: counter + 1,
        };

        dispatch(addToCart(userId, itemToAdd));
        setCounter(counter + 1);
    } else {
        console.error("Unable to get user Id from token");
    }
  };

  const handleDecreaseQuantity = () => {
    if (counter === 0) return;

    const decodedToken = decodeToken();
    if (decodedToken && decodedToken.sub) {
        const userId = parseInt(decodedToken.sub);
        dispatch(decreaseItemQuantity(userId, menuItem));

        if (counter > 0) {
            setCounter(counter - 1);
        }
    } else {
        console.error("Unable to get user Id from token");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddToCartClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log(itemId);
    dispatch(fetchMenuItemDetails(itemId));
  }, [dispatch, itemId]);

  
  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.log(error);
    return <div>{error}</div>
  }

  return (
    <div className='relative flex flex-col items-start justify-start h-screen px-0 pt-0 space-y-8 overflow-y-auto'>
      <div className='relative w-full'>
        <Buttons context='back' className='absolute top-7 left-6 z-50 drop-shadow-2xl' onClick={handleBackClick}/>
        <div className="w-full h-80 relative z-10">
          <Carousel 
            showStatus={false} 
            showThumbs={false} 
            className="w-full h-full absolute top-4 left-0"
            renderArrowPrev={(onclickHandler, hasPrev) => hasPrev && (
              <div onClick={onclickHandler} className='carousel-control-prev'/>
            )}
            renderArrowNext={(onclickHandler, hasNext) => hasNext && (
              <div onClick={onclickHandler} className='carousel-control-next'/>
            )}>
            {menuItem.images && menuItem.images.map((imageObj, index) => (
              <div key={index} className='carousel-image-container'>
                <img src={imageObj.image_url} alt={menuItem.name} className='carousel-image'/>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      
      <div className='pl-5 pr-5 flex flex-col h-full justify-between'>
      <div>
        <div className='w-full truncate mb-4'>
          <h2 className='text-3xl font-bold'>{menuItem?.name}</h2>
        </div>
        <p className='first-word-spacing text-l text-justify mb-1 font-light leading-5'>{menuItem?.description}</p>

      </div>

      <div className="flex flex-col justify-end w-full sticky bottom-1 bg-white pb-3 pt-2">
        <div className='mb-3.5'>
          <label className='text-lg font-medium my-1'>Note to restaurant</label>
          <textarea
            className=' textarea-placeholder px-2 text-l bg-gray opacity-50 text-black font-medium rounded-lg w-full h-15 resize-none mt-2'
            name='foodItemNotes'
            onChange={handleChange}
            placeholder='Enter your notes here'
          />
        </div>
        <div className='flex justify-between items-center w-full mb-3.5'>
          <h2 className='text-3xl font-medium'>{formatPrice(menuItem?.price)} đ</h2>

          <div className="flex items-center">
            <Buttons context='minus' count={counter} setCount={handleDecreaseQuantity} />
            <p className="mx-2 text-xl">{counter}</p>
            <Buttons context='plus' count={counter} setCount={handleAddToCart} />
          </div>
        </div>

        <div className="flex justify-center w-full">
          <Buttons context='add_to_cart' onClick={handleAddToCartClick} />
        </div>
      </div>
    </div>
  </div>
  );
};

export default MenuDetail;
