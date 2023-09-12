import api from '../../services/api';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SET_CART = 'SET_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const CREATE_CART = 'CREATE_CART';
export const UPDATE_CART_ITEM_NOTE = 'UPDATE_CART_ITEM_NOTE';
export const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS';
export const UPDATE_PICKUP_TYPE = 'UPDATE_PICKUP_TYPE';
export const COMPLETE_CART_SUCCESS = 'COMPLETE_CART_SUCCESS';
export const TRANSFER_CART_TO_ORDER_SUCCESS = 'TRANSFER_CART_TO_ORDER_SUCCESS';
export const TRANSFER_CART_TO_ORDER_ERROR = 'TRANSFER_CART_TO_ORDER_ERROR';


export const createCart = (userId, restaurantId, tableNo) => async dispatch => {
    try {
        console.log("Creating cart with:", { userId, restaurantId, tableNo });
        const response = await api.post(`/cart`, { userId, restaurantId, tableNo });
        dispatch({
            type: CREATE_CART,
            payload: response.data
        });
    } catch (error) {
        console.error("Error creating cart:", error);
    }
};

export const addToCart = (userId, item, restaurantId, tableNo) => async (dispatch, getState) => {
    console.log("Item at the start of addToCart action:", item);
    try {
        if (!item || !item.id) {
            console.error("Invalid item passed to addToCart:", item);
            return;
        }

        // Check if a cart exists for the user
        const currentCart = getState().cart.cart;
        console.log("Current cart:", currentCart);
        if (!currentCart) {
            // No cart exists, so create a new one and then proceed to add the item
            await dispatch(createCart(userId, restaurantId, tableNo));
        }

        // Fetch the current state of cart items
        const cartItems = getState().cart.items;

        const existingCartItem = cartItems.find(cartItem => cartItem.menuItem.id === item.id);
        let response;
        if (existingCartItem) {
            // If the item already exists in the cart, send an update request
            const payload = { 
                userId,
                menuItemId: item.id,
                quantity: item.quantity || (existingCartItem ? existingCartItem.quantity + 1 : 1), 
                note: item.note || existingCartItem.note || "",
            };
            response = await api.put(`/cart_item/${existingCartItem.id}`, payload); 
            //console.log("Dispatching ADD_TO_CART with payload:", payload);
        } else {
            const payload = { 
                userId,
                menuItemId: item.id,
                quantity: 1,
                note: "",
                restaurantId,
                tableNo
            };
            response = await api.post(`/cart_item/create`, payload);
            //console.log("Dispatching ADD_TO_CART with payload:", payload);
        }

        console.log("Server response:", response);
        if (response && response.data) {
            dispatch({
                type: ADD_TO_CART,
                payload: response.data
            });
        }

    } catch (error) {
        console.error("Error adding/updating item in cart:", error);
    }
};

export const decreaseItemQuantity = (userId, item) => async (dispatch, getState) => {
    try { 
        if (!item || !item.id) {
            console.error('Invalid item passed to decreaseItemQuantity:', item);
            return;
        }

        // Fetch the current state of cart items
        const cartItems = getState().cart.items;
        const existingCartItem = cartItems.find(cartItem => cartItem.menuItem.id === item.id);

        if (existingCartItem && existingCartItem.quantity > 1) {
            // Decrease the quantity by 1
            const payload = {
                userId,
                menuItemId: item.id,
                quantity: existingCartItem.quantity - 1,
                note: "",
            }
            
            const response = await api.put(`/cart_item/${existingCartItem.id}`, payload);
            if (response && response.data) {
                dispatch({
                    type: ADD_TO_CART,
                    payload: response.data
                });
            }
        } else if (existingCartItem && existingCartItem.quantity === 1) {
            // If the quantity is 1, remove the item completely
            await api.delete(`/cart_item/${existingCartItem.id}`);
            dispatch({
                type: REMOVE_FROM_CART,
                payload: existingCartItem.id,
            });
        } else {
            console.error("Item not found in cart:", item);
        }
    } catch (error) {
        console.error("Error decreasing item quantity in cart:", error);
    }
};

export const updateCartItemNote = (cartItemId, note) => async dispatch => {
    try {
        const payload = { note }; // Only update the note
        const response = await api.put(`/cart_item/${cartItemId}`, payload);
        if (response && response.data) {
            dispatch({
                type: UPDATE_CART_ITEM_NOTE,
                payload: response.data
            });
        }
    } catch (error) {
        console.error("Error updating cart item note:", error);
    }
};

export const removeFromCart = (cartItemId) => async dispatch => {
    try {
        // console.log("Dispatching REMOVE_FROM_CART with payload:", cartItemId);
        await api.delete(`/cart_item/${cartItemId}`);
        dispatch({
            type: REMOVE_FROM_CART,
            payload: cartItemId
        });
    } catch (error) {
        console.error("Error removing item from cart:", error);
    }
};

export const fetchCartItem = (userId) => async dispatch => {
    try {
        const response = await api.get(`/cart_item/user/${userId}/active`);
        dispatch({
            type: FETCH_CART_ITEMS,
            payload: response.data
        })
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}

export const updatePickupType = (cartId, pickupType) => async dispatch => {
    try {
        const response = await api.put(`/cart/${cartId}/pickup-type`, { pickup_type: pickupType });
        dispatch({
            type: UPDATE_PICKUP_TYPE,
            payload: response.data
        });
    } catch (error) {
        console.error("Error updating pickup type:", error);
    }
};

export const completeCart = (cartId) => async dispatch => {
    console.log("completeCart action is called with cartId:", cartId);
    try {
        const response = await api.put(`/cart/${cartId}/complete`);
        if (response && response.status === 200) {
            dispatch({
                type: COMPLETE_CART_SUCCESS,
            });
        } else {
            console.error("Failed to complete the cart with response:", response);
        }
    } catch (error) {
        console.error("Error completing the cart:", error);
    }
};


export const clearCart = () => ({
    type: CLEAR_CART,
});

export const setCart = (cart) => ({
    type: SET_CART,
    payload: cart
});
