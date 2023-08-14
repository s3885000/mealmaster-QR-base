import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT, CHECK_PHONE_NUMBER_REQUEST, CHECK_PHONE_NUMBER_SUCCESS, CHECK_PHONE_NUMBER_FAILURE } from "../../actions/authentication/authActions";

const initialState = {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    user: {
        accessToken: localStorage.getItem('accessToken'),
    },
    error: null,
    checkingPhoneNumber: false,
    phoneNumberExists: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        //Check valid phone number action handler
        case CHECK_PHONE_NUMBER_REQUEST:
            return {
                ...state,
                checkingPhoneNumber: true,
                phoneNumberExists: null,
                error: null,
            }
        case CHECK_PHONE_NUMBER_SUCCESS:
            return {
                ...state,
                checkingPhoneNumber: false,
                phoneNumberExists: action.payload,
            }
        case CHECK_PHONE_NUMBER_FAILURE:
            return {
                ...state,
                checkingPhoneNumber: false,
                error: action.payload,
            }

        //Auth login action handler
        case AUTH_LOGIN_SUCCESS:
            return { 
                ...state, 
                isAuthenticated: true,
                user: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                },
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