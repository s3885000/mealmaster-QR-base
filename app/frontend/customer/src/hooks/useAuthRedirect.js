import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useEffect } from "react";

const redirectAfterLogin = 'redirectAfterLogin';

export const useAuthRedirect = (targetURL) => {
    // Get the authentication state from Redux
    const { isAuthenicated } = useSelector(state => state.auth);

    // Access the history object to navigate to other routes
    const history = useHistory();

    useEffect(() => {
        if (!isAuthenicated) {
            //Save the target URL to localStorage so that can redirect back to it after login
            localStorage.setItem(redirectAfterLogin, targetURL);
            history.push('/login'); 
        }else {
            //If the user is already logged in, redirect to the target URL if it's provided
            if (targetURL) {
                history.push(targetURL);
            }
        }
    }, [isAuthenicated, targetURL, history]);
}