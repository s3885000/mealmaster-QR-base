import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HaidilaoLogo } from '../../asset/images/restaurant_info/haidilao/logo/index.js';
import { Buttons, Popups } from '../../components'; 
import { StarIcon, TimeIcon } from '../../asset/icons/box/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenuItems } from '../../redux/actions/menuItemsActions.js';
import { addToCart, decreaseItemQuantity, removeFromCart, updateCartItemNote } from '../../redux/actions/cartActions.js';
import { decodeToken }from '../../services/api.js';

const formatPrice = (price) => {
  return price ? price.toLocaleString('en-US') : '0';
}

const ItemContainer = ({ children }) => (
  <div className="w-300 h-87 flex items-center pl-4 pr-4 pt-4 pb-4 shadow-lg rounded-xl">
    {children}
  </div>
);

const Items = ({ type, restaurantId, categoryId, cartItemId, orderItem, orderItems, ...itemProps }) => {
  const { tableNo } = useParams();

  // console.log("tableNo:", tableNo);
  // console.log("restaurantId:", restaurantId);

  const [counter, setCounter] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [addedToCart] = useState({});
  const [notes]= useState("");
  const [currentNotes, setCurrentNotes] = useState("");

  const navigate = useNavigate();

  // redux food_items
  const menuItemsState = useSelector(state => state.menuItems);
  const { loading, error, menuItems } = menuItemsState;
  const dispatch = useDispatch();

  // redux cart items
  const cartItems = useSelector(state => state.cart.items);

  const handleAddToCart = (item) => {
    const decodedToken = decodeToken();
    if (decodedToken && decodedToken.sub) {
        const userId = parseInt(decodedToken.sub);
      
        const existingCartItem = cartItems.find(cartItem => cartItem.menuItem.id === item.id);
        if (existingCartItem) {
          // Increase its quantity by 1 for the food_item_cart
          if (type === 'food_item_cart') {
            dispatch(addToCart(userId, {...item, quantity: existingCartItem.quantity + 1, note: notes }, restaurantId, tableNo));
          }
        } else {
          dispatch(addToCart(userId, {...item, quantity: 1, note: notes }, restaurantId, tableNo));
        }
    } else {
        console.error("Unable to get user Id from token");
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const decodedToken = decodeToken();
    if (decodedToken && decodedToken.sub) {
        const userId = parseInt(decodedToken.sub);

        // For 'best_sellers' and 'food_item', remove the entire item from the cart
        if (type === 'best_sellers' || type === 'food_item') {
          const cartItemToRemove = cartItems.find(cartItem => cartItem.menuItem.id === itemId);
          if (cartItemToRemove) {
              dispatch(removeFromCart(cartItemToRemove.id));
          }
        } else {
            dispatch(decreaseItemQuantity(userId, { id: itemId }));
        }

    } else {
        console.error("Unable to get user Id from token");
    }
  };

  useEffect(() => {
    setCurrentNotes(notes);
    console.log("Updated currentNotes state:", currentNotes);
  }, [notes]);

  useEffect(() => {
    if(restaurantId && categoryId !== undefined && tableNo !== undefined) {
        dispatch(fetchMenuItems(restaurantId, categoryId, tableNo));
    }
  }, [dispatch, restaurantId, categoryId, tableNo]);


  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  }
  

  switch(type) {
    case 'best_sellers':
    case 'food_item':
      return Array.isArray(menuItems) ? menuItems.map(( item, index ) => {
        const isItemInCart = addedToCart[item.id] || cartItems.some(cartItem => cartItem.menuItem.id === item.id);
        const imageURL = item.images && item.images[0] ? item.images[0].image_url : null;
        if (!item.images || !item.images[0]) {
            return null;
        }

        const handleDetailClick = () => {
            navigate(`/menu-detail/${item.id}`);
        };

        return (
        <ItemContainer key={index} className="flex justify-between items-center">
          <img src={imageURL} alt={item.name} className="flex-shrink-0 flex-grow-0 w-22 h-22 rounded-lg" onClick={handleDetailClick} />
          <div className="flex-grow ml-2 overflow-hidden">
            <p className="text-lg font-semibold truncate">{item.name}</p>
            <p className="text-sm text-placeholders truncate">{item.description}</p>
            <p className="mt-3.5 text-lg font-semibold">{formatPrice(item.price)}đ</p>
          </div>
          <div className="flex-shrink-0 flex-grow-0 ml-2 min-w-10">
            {isItemInCart ? (
              <Buttons 
                  context='minus' 
                  onClick={() => handleDecreaseQuantity(item.id)}
              />
            ) : (
              <Buttons 
                  context='plus' 
                  onClick={() => handleAddToCart(item)}
              />
            )}
          </div>
        </ItemContainer>
      );
      }) : null;

    case 'food_item_cart':
      console.log('Received notes:', itemProps.note);
      return (
        <>
          <ItemContainer>
            <img src={itemProps.images && itemProps.images[0] ? itemProps.images[0].image_url : null} alt={itemProps.name} className="w-16 h-16 rounded-xl" />
            <div className="flex-grow ml-2 overflow-hidden">
              <p className="text-base font-medium leading-4 text-left truncate">{itemProps.name}</p>
              <div className="flex items-center space-x-1.5 text-sm text-placeholders mb-1">
                <span className='truncate w-2/3'>{itemProps.note || "Add notes"}</span>
                <Buttons context='edit' onClick={togglePopup} />
              </div>
              <div className="flex items-center mt-2">
                <p className="text-base font-medium leading-5 text-left">{formatPrice(itemProps.price)}đ</p>
              </div>
            </div>
            <div className="flex items-center">
              <Buttons 
                context='minus' 
                count={counter} 
                setCount={setCounter} 
                onClick={() => handleDecreaseQuantity(itemProps.id)}
              />
              <p className="mx-2 text-xl">{itemProps.quantity}</p>
              <Buttons context='plus' count={counter} setCount={setCounter} onClick={() => handleAddToCart(itemProps)}/>
            </div>
          </ItemContainer>
          <Popups 
            visible={popupVisible} 
            type='notes' 
            onClose={togglePopup} 
            currentNotes={itemProps.note}
            onUpdateNotes={(updatedNotes) => {
              dispatch(updateCartItemNote(cartItemId, updatedNotes));
              setCurrentNotes(updatedNotes);
            }} 
          />
        </>
      );      

    case 'food_item_on_going':
    case 'food_item_history':
      return Array.isArray(orderItems) ? orderItems.map((orderItem, index) => (
        <ItemContainer key={index}>
          <img src={orderItem.menuItem.images && orderItem.menuItem.images[0] ? orderItem.menuItem.images[0].image_url : null} 
                alt={orderItem.menuItem.name} 
                className="w-16 h-16 rounded-xl" />
          <div className="flex-grow ml-2 overflow-hidden">
            <p className="text-base font-medium leading-4 text-left truncate">{orderItem.menuItem.name}</p>
            <div className="flex items-center space-x-1.5 text-sm text-placeholders mb-1">
              {orderItem.note || "No notes"}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-base font-medium leading-5 text-left">{formatPrice(orderItem.price)}đ</p>
            </div>
          </div>
          <div className="flex-shrink-0 flex-grow-0 flex flex-col items-end">
            <p className="text-md">{orderItem.quantity}x</p>
            <p className="text-md text-right -mb-5">Total {formatPrice(orderItem.price * orderItem.quantity)}đ</p>
          </div>
        </ItemContainer>
      )) : null;
    

    case 'home_nearby_restaurant':
      return (
        <div className="w-44 h-48 rounded-xl border border-transparent flex flex-col items-center shadow-lg">
          <HaidilaoLogo className="w-44 h-30 rounded-t-xl" />
          <div className="p-2 text-center h-18 flex flex-col justify-between">
            <h1 className="font-bold text-base text-black overflow-ellipsis whitespace-nowrap overflow-hidden">Haidilao - Đồng Khởi</h1>
            <div className="flex items-center text-base text-primary">
              <StarIcon className="w-3 h-3"/>
              <p className="font-medium text-sm ml-1">4.9 (284)</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center text-base text-primary">
                <TimeIcon className="w-3 h-3"/>
                <p className="font-medium text-sm ml-1">15-25 mins</p>
              </div>
              <p className="font-medium text-sm text-primary">0.2km</p>
            </div>
          </div>
        </div>
      );
    
    case 'nearby_restaurant':
      return (
        <ItemContainer>
          <HaidilaoLogo className="w-21 h-25 rounded-2xl" />
          <div className="flex flex-col flex-grow -mb-3 ml-1">
            <p className="font-bold text-base text-black overflow-ellipsis whitespace-nowrap overflow-hidden">Haidilao - Đồng Khởi</p>
            <div className="flex items-center text-base text-primary">
              <StarIcon className="w-3 h-3"/>
              <p className="font-medium text-sm ml-1">4.9 (284)</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center text-base text-primary">
                <TimeIcon className="w-3 h-3"/>
                <p className="font-medium text-sm ml-1">15-25 mins</p>
              </div>
              <p className="font-medium text-sm text-primary">0.2km</p>
            </div>
          </div>
        </ItemContainer>
      );

      
        
      
    case 'home_history':
      return (
        <div className="w-44 h-48 rounded-xl border border-transparent flex flex-col items-center shadow-lg">
          <HaidilaoLogo className="w-44 h-30 rounded-t-xl" />
          <div className="p-2 text-center h-18 flex flex-col justify-between">
            <h1 className="font-bold text-base text-black overflow-ellipsis whitespace-nowrap overflow-hidden">Haidilao - Đồng Khởi</h1>
            <div className="flex items-center text-base ">
              <p className="font-medium text-sm ml-1">Date: 7th May 2023</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex items-center text-base">
                <p className="font-medium text-sm ml-1">81.000 đ</p>
              </div>
            </div>
          </div>
        </div>
        );
    default:
      return null;
  }
};

export default Items;
