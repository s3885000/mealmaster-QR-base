import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const redirectAfterLogin = 'redirectAfterLogin';

export const useAuthRedirect = (targetURL) => {
    // Get the authentication state from Redux
    const { isAuthenticated } = useSelector(state => state.auth);

    // Access the navigate function from React Router v6 to navigate to other routes
    const navigate = useNavigate();

    // Access the current location
    const location = useLocation();

    useEffect(() => {
        // Exclusion list
        const exclusionRoutes = ['/login-password'];

        // Check if the current route is in the exclusion list
        if (exclusionRoutes.includes(location.pathname)) {
            return;
        }

        /* Commenting out the authentication checks for free browsing
        if (!isAuthenticated) {
            if (!localStorage.getItem(redirectAfterLogin) && targetURL !== "/login") {
                localStorage.setItem(redirectAfterLogin, targetURL);
            } else if (localStorage.getItem(redirectAfterLogin) === '/login') {
                localStorage.removeItem(redirectAfterLogin);
            }
            navigate('/login'); 
        } else {
        */

        // This part will always execute now, irrespective of authentication
        const redirectURL = localStorage.getItem(redirectAfterLogin) || targetURL || '/home';
        localStorage.removeItem(redirectAfterLogin);
        if (location.pathname !== redirectURL) {
            navigate(redirectURL);
        }
        
        // } <-- This was the end bracket for the else section

    }, [isAuthenticated, targetURL, navigate, location.pathname]);
}
