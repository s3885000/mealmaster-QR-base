const initialState = {
    loading: false,
    menuItems: [],
    console: ''
}

export const menuItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MENU_ITEMS_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'FETCH_MENU_ITEMS_SUCCESS':
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
                error: '',
            };

        case 'FETCH_MENU_ITEMS_FAILURE':
            return {
                ...state,
                loading: false,
                menuItems: [],
                error: action.payload,
            }
        
        default:
            return state;
    }
}