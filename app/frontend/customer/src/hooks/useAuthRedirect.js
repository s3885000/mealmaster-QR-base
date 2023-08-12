import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const redirectAfterLogin = 'redirectAfterLogin';

export const useAuthRedirect = (targetURL) => {
    // Get the authentication state from Redux
    const { isAuthenticated } = useSelector(state => state.auth);
    //console.log("Authentication status:", isAuthenticated);

    // Access the navigate function from React Router v6 to navigate to other routes
    const navigate = useNavigate();

    // Access the current location
    const location = useLocation();

    

    useEffect(() => {
        // console.log("Current path:", location.pathname);
        // console.log("Provided targetURL:", targetURL);
        // console.log("Stored redirectAfterLogin:", localStorage.getItem(redirectAfterLogin));


        // Exclusion list
        const exclusionRoutes = ['/login-password'];

        // Check if the current route is in the exclusion list
        if (exclusionRoutes.includes(location.pathname)) {
            return;
        }

        if (!isAuthenticated) {
            if (!localStorage.getItem(redirectAfterLogin) && targetURL !== "/login") {
                // console.log("Setting redirectAfterLogin to:", targetURL);
                localStorage.setItem(redirectAfterLogin, targetURL);
            } else if (localStorage.getItem(redirectAfterLogin) === '/login') {
                localStorage.removeItem(redirectAfterLogin); // Clear the wrong value
            }
            navigate('/login'); 
        
        } else {
            // If the user is already logged in, redirect to the target URL if it's provided
            const redirectURL = localStorage.getItem(redirectAfterLogin) || targetURL || '/home';
            localStorage.removeItem(redirectAfterLogin);
            if (location.pathname !== redirectURL) {
                // console.log("Redirecting to stored/target URL:", redirectURL);
                navigate(redirectURL);
            }
        }
    }, [isAuthenticated, targetURL, navigate, location.pathname]);
}
