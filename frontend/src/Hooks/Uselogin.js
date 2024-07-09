import { useState } from "react";
import { useAuthContext } from "./Useauthcontext";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';//
import { toast } from "react-toastify";


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { dispatch } = useAuthContext()
    const [mailerror, setMailerror] = useState('')


    const login = async (email, usrpassword, timeout, checkbox) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, usrpassword, timeout, checkbox })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setMailerror(json.error)



            setError(true)
            toast.error(json.error)

        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
            // Set token expiration timeout
            const token = json.token;
            if (token) {
                setTokenExpirationTimeout(token);
            }
        }

    }

    const emailresetvr = async (email) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/login/resetpassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)



            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)

        }

        if (response.ok) {


            toast.success(json.message)

            setIsLoading(false)

        }

    }
    const otpresetvr = async (otp) => {

        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/login/resetpassword/otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)


            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {


            toast.success(json.message)
            setIsLoading(false)

        }
    }
    const passwordresetvr = async (newpassword, confirmPassword) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/login/resetpassword/changep', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newpassword, confirmPassword })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)


            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {


            toast.success(json.message)
            setIsLoading(false)

        }

    }


    //token code
    const decodeToken = (token) => {
        return jwtDecode(token);
    };

    const isTokenExpired = (token) => {
        const decodedToken = decodeToken(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        return Date.now() > expirationTime;
    };

    const setTokenExpirationTimeout = (token) => {
        if (isTokenExpired(token)) {
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' })
            console.log('Token is already expired. User removed from local storage');

            return;
        }

        const decodedToken = decodeToken(token);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        console.log(`Token will expire in ${timeUntilExpiration} milliseconds`);

        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                toast.info("Session timeout Login Again")
            }
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' })
            console.log('User removed from local storage due to token expiration');

        }, timeUntilExpiration);
    };
    return { login, emailresetvr, otpresetvr, passwordresetvr, isLoading, mailerror, error }

}



