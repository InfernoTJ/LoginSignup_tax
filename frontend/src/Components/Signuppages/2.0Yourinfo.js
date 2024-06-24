import { Box, TextField, Typography } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useSignup } from '../../Hooks/Usesignup'


const CustomPhoneInput = ({ value, onChange, error }) => {
    

    return (
        <PhoneInput
        country={'in'}
        value={value}
        onChange={onChange}
        containerStyle={{
                width: '100%',
                borderRadius: '4px',
                height: '60px',
                background: 'white',
                borderStyle: 'solid',
                borderWidth: '1px',
                display: 'flex',
                alignItems: 'center',
            }}
            inputStyle={{
                width: '100%',
                border: 'none', height: '60px',
                outline: 'none',
                fontSize: '16px',
                color: '#000',
                padding: '8px 0',
                marginLeft: '60px',
            }}
            buttonStyle={{
                border: 'none', height: '60px',
                background: 'white',
                padding: '0',
                marginLeft: '8px',
                
            }}
            dropdownStyle={{
                margin: '0',
                width: '300px',
            }}
            specialLabel=''
            />
        );
    };
    const YourInfo= forwardRef(({ formData, setFormData }, ref)=> {
        
        const [phoneno, setPhoneno] = useState(formData.phoneno)
        const[firstname,setfirstname] =useState(formData.firstname)
        const[lastname,setlastname] =useState(formData.lastname)
        const [phnerror, setphnerror] = useState('')
        
        const handlePhoneChange = (value) => {
            setPhoneno(value);
            // Validate phone number here and set error state accordingly
            const isValid = value.length > 10; // Example validation
            setphnerror(!isValid);
        }
        
        const {urinfosignup,error,isLoading} =useSignup()
        
        useImperativeHandle(ref, () => async () => {
            // Add validation logic here
         
        try {
            await urinfosignup(firstname,lastname,phoneno)
            setFormData(prev => ({ ...prev, firstname,lastname,phoneno }));
            return true;
        } catch (error) {
            return false
        }
        
        
        
        
    })
    
    return (
        <Box>a
            <Typography variant='h3'>Your Information</Typography>
            <TextField
                placeholder="fisrt name" //error={(emailError || allerror)}
                name='email'
                value={firstname}
                onChange={(e) => {
                        setfirstname(e.target.value);
                    }}
                    //  (emailError || allerror) ? '10px 10px 0 0' :
                    sx={{
                        width: '100%', bgcolor: 'white',
                        borderRadius: '10px', '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                        '& fieldset': {
                            borderRadius: '10px',
                        },
                    },
                }}
                id="outlined-required"
            />
            <TextField
                placeholder="last name" // error={(emailError || allerror)}
                name='email'
                value={lastname}
                onChange={(e) => {
                    setlastname(e.target.value);
                }}
                sx={{
                    width: '100%', bgcolor: 'white',
                    borderRadius: '10px', '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        '& fieldset': {
                            borderRadius: '10px',
                        },
                    },
                }}
                id="outlined-required"
            />
            <CustomPhoneInput
                value={phoneno}

                onChange={handlePhoneChange}
                error={phnerror}
            />



        </Box>)
})

export default YourInfo