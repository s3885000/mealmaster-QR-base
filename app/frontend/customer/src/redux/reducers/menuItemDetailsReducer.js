// reducers/menuItemDetailsReducer.js
const initialState = {
    loading: false,
    menuItem: {},
    error: ''
}

export const menuItemDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MENU_ITEM_DETAILS_REQUEST':
            return {
                ...state,
                loading: true
            };

        case 'FETCH_MENU_ITEM_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                menuItem: action.payload,
                error: '',
            };

        case 'FETCH_MENU_ITEM_DETAILS_FAILURE':
            return {
                ...state,
                loading: false,
                menuItem: {},
                error: action.payload,
            }
        
        default:
            return state;
    }
}
