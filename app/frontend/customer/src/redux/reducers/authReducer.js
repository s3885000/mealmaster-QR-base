import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT } from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return { 
                ...state, 
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case AUTH_LOGIN_FAILURE:
            return { 
                ...state, 
                isAuthenticated: false, 
                user: null,
                error: action.payload,
             };
        case AUTH_LOGOUT:
            return { 
                ...state, 
                isAuthenticated: false, 
                user: null,
                error: null, 
            };
        default:
            return state;
    };
};