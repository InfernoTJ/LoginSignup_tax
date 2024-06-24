import { useState } from "react";


import { toast } from "react-toastify";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
  const [zaerror ,setZaerror]=useState(false)

    const emailsignup = async (email) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
          
           
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
            
        }

        if (response.ok) {
            
           setZaerror(true)
            toast.success(json.message)
     
            setIsLoading(false)
            
        }

    }
    const otpsignup = async (otp) => {

        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/user/signup/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {otp} )
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }
    const urinfosignup = async (firstname, lastname,phoneno) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname,phoneno})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }
    const firminfosignup = async (firmname, country,state) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/firm-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firmname, country,state })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }
    const firmdetailsignup = async (firmsize, referal) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/firm-size-services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firmsize, referal })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }
    const firmservicessignup = async (firmservices) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/services-provided', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({firmservices })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }
    const urrolesignup = async (roleinfirm) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/role', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({roleinfirm })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }
    const firmsettingsignup = async (weburl, currency) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/web-url-currency', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ weburl, currency })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }
    const passwordsignup = async (usrpassword) => {

        setIsLoading(true)
        setError(null)



        const response = await fetch('/api/user/signup/set-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usrpassword})
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            
             setZaerror(false)
            setError(json.error)
            toast.error(json.error)
            throw new Error(json.error)
        }

        if (response.ok) {
            
            setZaerror(true)
            toast.success(json.message)
            setIsLoading(false)
            
        }

    }

   
    return { emailsignup, passwordsignup,firmsettingsignup,  urrolesignup,firmservicessignup,firmdetailsignup,firminfosignup,urinfosignup,otpsignup, zaerror,isLoading, error }

}




