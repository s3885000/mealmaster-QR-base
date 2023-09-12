import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SET_CART, CREATE_CART, UPDATE_CART_ITEM_NOTE, FETCH_CART_ITEMS, UPDATE_PICKUP_TYPE, COMPLETE_CART_SUCCESS } from "../actions/cartActions";

const initialState = {
    cart: null,
    items: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CART:
            return {
                ...state,
                cart: action.payload
            };

        case ADD_TO_CART:
            console.log("Current state:", state);
            console.log("Action payload:", action.payload);
            const newItem = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.menuItem.id === newItem.menuItem.id);
        
            let updatedItems;
        
            if (existingItemIndex >= 0) {
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: newItem.quantity
                };
        
                if (updatedItems[existingItemIndex].quantity <= 0) {
                    updatedItems = updatedItems.filter(item => item.menuItem.id !== newItem.menuItem.id);
                }
        
            } else {
                updatedItems = [...state.items, newItem];
            }
        
            return { 
                ...state, 
                items: updatedItems,
                cart: action.payload.cart ? {
                    ...state.cart,
                    total_item: action.payload.cart.total_item || (state.cart ? state.cart.total_item : 0)
                } : state.cart
            };
            
        
        case UPDATE_CART_ITEM_NOTE:
            const updatedNoteItem = action.payload;
            const itemIndexToUpdate = state.items.findIndex(item => item.id === updatedNoteItem.id);
            
            if (itemIndexToUpdate >= 0) {
                const updatedNoteItems = [...state.items];
                updatedNoteItems[itemIndexToUpdate].note = updatedNoteItem.note; // Set the note
        
                return { ...state, items: updatedNoteItems };
            } else {
                // This should not happen, but just in case
                console.error("Item not found in cart for updating note:", updatedNoteItem);
                return state;
            };
        
        case UPDATE_PICKUP_TYPE:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    pickup_type: action.payload.pickup_type,
                    total_price: action.payload.total_price,
                    total_item: action.payload.total_item,
                }
            }

        case REMOVE_FROM_CART:
            // console.log("Current state:", state);
            // console.log("Action payload:", action.payload);
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        
        case FETCH_CART_ITEMS:
            // console.log("Previous state:", state);
            // console.log("Action:", action);
            return {
                ...state,
                items: action.payload,
                cart: action.payload[0].cart 
            };

        case SET_CART:
            return {
                ...state,
                cart: action.payload.cart,
                items: action.payload.items
            }

        case CLEAR_CART:
            return {
                ...initialState,
            };

        case COMPLETE_CART_SUCCESS:
            return {
                ...state,
                cart: null,
                items: []
            };
        
        
        default:
            return state;
    }
}

export default cartReducer;
